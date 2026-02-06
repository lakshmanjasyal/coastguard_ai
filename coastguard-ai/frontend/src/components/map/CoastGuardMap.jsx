import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import LocationButton from './LocationButton'
import MapLayerControl from './MapLayerControl'
import RegionSelector from './RegionSelector'
import DisasterOverlay from './DisasterOverlay'
import DisasterLegend from './DisasterLegend'
import MapAnimator from './MapAnimator'
import { TILE_LAYERS, INDIAN_REGIONS } from '../../data/mapData'

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Mock data for coastal villages with risk zones
const mockRiskZones = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: { name: 'Chennai Coastal Area', risk: 'low' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [80.25, 13.05],
                    [80.30, 13.05],
                    [80.30, 13.10],
                    [80.25, 13.10],
                    [80.25, 13.05]
                ]]
            }
        },
        {
            type: 'Feature',
            properties: { name: 'Ennore Creek', risk: 'medium' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [80.30, 13.10],
                    [80.35, 13.10],
                    [80.35, 13.15],
                    [80.30, 13.15],
                    [80.30, 13.10]
                ]]
            }
        },
        {
            type: 'Feature',
            properties: { name: 'Pulicat Lake Region', risk: 'high' },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [80.20, 13.15],
                    [80.25, 13.15],
                    [80.25, 13.20],
                    [80.20, 13.20],
                    [80.20, 13.15]
                ]]
            }
        }
    ]
}

// Mock shelter locations
const mockShelters = [
    { id: 1, name: 'Community Center Shelter', lat: 13.08, lng: 80.27, capacity: 500 },
    { id: 2, name: 'School Shelter', lat: 13.12, lng: 80.32, capacity: 300 },
    { id: 3, name: 'Hospital Safe Zone', lat: 13.18, lng: 80.22, capacity: 200 },
]

// Component to handle map location updates with retry logic
function LocationMarker({ onLocationChange }) {
    const [position, setPosition] = useState(null)
    const [retryCount, setRetryCount] = useState(0)
    const map = useMap()

    useEffect(() => {
        let isSubscribed = true
        const maxRetries = 3

        const requestLocation = (attempt = 0) => {
            if (!isSubscribed || attempt >= maxRetries) {
                if (attempt >= maxRetries) {
                    console.warn('⚠️ Max location retries reached, using fallback')
                    const fallbackLocation = { lat: 13.08, lng: 80.27 }
                    setPosition(fallbackLocation)
                    map.setView([fallbackLocation.lat, fallbackLocation.lng], 11)
                    onLocationChange && onLocationChange(fallbackLocation)
                }
                return
            }

            console.log(`🔍 Requesting location (attempt ${attempt + 1}/${maxRetries})...`)

            map.locate({
                setView: true,
                maxZoom: 13,
                timeout: 10000, // 10 seconds per attempt
                maximumAge: 0,
                enableHighAccuracy: true
            })

            const locationFoundHandler = (e) => {
                if (!isSubscribed) return
                console.log('✅ Location found:', e.latlng)
                setPosition(e.latlng)
                onLocationChange && onLocationChange(e.latlng)
                cleanup()
            }

            const locationErrorHandler = (e) => {
                if (!isSubscribed) return
                console.warn(`⚠️ Location attempt ${attempt + 1} failed:`, e.message)

                // Retry with exponential backoff
                const retryDelay = Math.min(1000 * Math.pow(2, attempt), 5000)
                setTimeout(() => {
                    setRetryCount(attempt + 1)
                    requestLocation(attempt + 1)
                }, retryDelay)
            }

            const cleanup = () => {
                map.off('locationfound', locationFoundHandler)
                map.off('locationerror', locationErrorHandler)
            }

            map.on('locationfound', locationFoundHandler)
            map.on('locationerror', locationErrorHandler)
        }

        // Start location request
        requestLocation(0)

        // Cleanup on unmount
        return () => {
            isSubscribed = false
        }
    }, [map, onLocationChange])

    return position === null ? null : (
        <Marker position={position}>
            <Popup>
                <div className="text-sm">
                    <strong>📍 Your Location</strong><br />
                    Lat: {position.lat.toFixed(4)}<br />
                    Lng: {position.lng.toFixed(4)}
                    {retryCount > 0 && <><br /><span className="text-xs text-gray-500">Found after {retryCount} retries</span></>}
                </div>
            </Popup>
        </Marker>
    )
}

LocationMarker.propTypes = {
    onLocationChange: PropTypes.func,
}

/**
 * CoastGuardMap - Main interactive map component
 */
const CoastGuardMap = ({
    userLocation,
    onLocationChange,
    tileLayer = 'standard',
    onTileLayerChange,
    activeRegion = 'all',
    onRegionChange,
    enabledDisasters = ['flood', 'cyclone'],
    onDisasterToggle
}) => {
    const mapRef = useRef(null)

    // Get current region data for map animation
    const currentRegion = INDIAN_REGIONS[activeRegion] || INDIAN_REGIONS.all

    // Style function for risk zones
    const getZoneStyle = (feature) => {
        const risk = feature.properties.risk
        let color, fillColor, fillOpacity

        switch (risk) {
            case 'low':
                color = '#14b8a6'
                fillColor = '#14b8a6'
                fillOpacity = 0.2
                break
            case 'medium':
                color = '#fb923c'
                fillColor = '#fb923c'
                fillOpacity = 0.3
                break
            case 'high':
                color = '#dc2626'
                fillColor = '#dc2626'
                fillOpacity = 0.4
                break
            default:
                color = '#64748b'
                fillColor = '#64748b'
                fillOpacity = 0.2
        }

        return {
            color,
            weight: 2,
            opacity: 0.8,
            fillColor,
            fillOpacity,
        }
    }

    // Popup for each zone
    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            const risk = feature.properties.risk.toUpperCase()
            layer.bindPopup(`
        <div class="text-sm">
          <strong>${feature.properties.name}</strong><br/>
          Risk Level: <span class="font-bold ${risk === 'HIGH' ? 'text-danger' :
                    risk === 'MEDIUM' ? 'text-sunset' :
                        'text-safe'
                }">${risk}</span>
        </div>
      `)
        }
    }

    // Custom icon for shelters
    const shelterIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-10 h-10 bg-safe rounded-full border-2 border-white shadow-lg">
      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    </div>`,
        className: 'custom-shelter-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    })

    return (
        <MapContainer
            center={[13.08, 80.27]}
            zoom={11}
            className="h-full w-full z-0"
            ref={mapRef}
        >
            {/* Map animator for smooth region transitions */}
            <MapAnimator center={currentRegion.center} zoom={currentRegion.zoom} />

            {/* Dynamic tile layer based on selection */}
            <TileLayer
                key={tileLayer}
                attribution={TILE_LAYERS[tileLayer]?.attribution || TILE_LAYERS.standard.attribution}
                url={TILE_LAYERS[tileLayer]?.url || TILE_LAYERS.standard.url}
                maxZoom={TILE_LAYERS[tileLayer]?.maxZoom || 19}
            />

            {/* Disaster overlays - replaces old risk zones */}
            <DisasterOverlay
                activeRegion={activeRegion}
                enabledDisasters={enabledDisasters}
            />

            {/* Risk zones - keeping for backward compatibility */}
            <GeoJSON
                data={mockRiskZones}
                style={getZoneStyle}
                onEachFeature={onEachFeature}
            />

            {/* Shelter markers */}
            {mockShelters.map(shelter => (
                <Marker
                    key={shelter.id}
                    position={[shelter.lat, shelter.lng]}
                    icon={shelterIcon}
                >
                    <Popup>
                        <div className="text-sm">
                            <strong>{shelter.name}</strong><br />
                            Capacity: {shelter.capacity} people
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* User location marker */}
            <LocationMarker onLocationChange={onLocationChange} />

            {/* Top-right controls */}
            <div className="absolute top-4 right-4 z-[1000] flex gap-2">
                {/* Region Selector */}
                {onRegionChange && (
                    <RegionSelector
                        activeRegion={activeRegion}
                        onRegionSelect={onRegionChange}
                    />
                )}

                {/* Map Layer Control */}
                {onTileLayerChange && (
                    <MapLayerControl
                        currentLayer={tileLayer}
                        onLayerChange={onTileLayerChange}
                    />
                )}
            </div>

            {/* Bottom-left disaster legend */}
            {onDisasterToggle && (
                <div className="absolute bottom-20 left-4 z-[1000] max-w-xs">
                    <DisasterLegend
                        enabledDisasters={enabledDisasters}
                        onDisasterToggle={onDisasterToggle}
                    />
                </div>
            )}

            {/* Manual location button */}
            <LocationButton />
        </MapContainer>
    )
}

CoastGuardMap.propTypes = {
    userLocation: PropTypes.object,
    onLocationChange: PropTypes.func,
    tileLayer: PropTypes.string,
    onTileLayerChange: PropTypes.func,
    activeRegion: PropTypes.string,
    onRegionChange: PropTypes.func,
    enabledDisasters: PropTypes.arrayOf(PropTypes.string),
    onDisasterToggle: PropTypes.func,
}

export default CoastGuardMap
