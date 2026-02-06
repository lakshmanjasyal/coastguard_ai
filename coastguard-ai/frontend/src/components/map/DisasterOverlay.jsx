import React from 'react'
import PropTypes from 'prop-types'
import { GeoJSON } from 'react-leaflet'
import { DISASTER_TYPES } from '../../data/mapData'
import { mockDisasterZones } from '../../data/mockDisasterZones'

const DisasterOverlay = ({ activeRegion, enabledDisasters }) => {
    // Filter disaster zones based on active region and enabled disasters
    const filteredFeatures = mockDisasterZones.features.filter(feature => {
        const matchesRegion = !activeRegion || activeRegion === 'all' || feature.properties.region === activeRegion
        const matchesDisaster = enabledDisasters.includes(feature.properties.disaster)
        return matchesRegion && matchesDisaster
    })

    const filteredData = {
        type: 'FeatureCollection',
        features: filteredFeatures
    }

    // Style function for disaster zones
    const getDisasterStyle = (feature) => {
        const disasterType = feature.properties.disaster
        const disaster = DISASTER_TYPES[disasterType]

        if (!disaster) {
            return {
                color: '#64748b',
                weight: 2,
                opacity: 0.8,
                fillColor: '#64748b',
                fillOpacity: 0.2
            }
        }

        return {
            color: disaster.color,
            weight: 2,
            opacity: 0.8,
            fillColor: disaster.color,
            fillOpacity: disaster.opacity
        }
    }

    // Popup for each disaster zone
    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            const { name, disaster, severity } = feature.properties
            const disasterInfo = DISASTER_TYPES[disaster]

            layer.bindPopup(`
                <div class="text-sm">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-2xl">${disasterInfo?.icon || '⚠️'}</span>
                        <strong>${name}</strong>
                    </div>
                    <div class="space-y-1">
                        <div>
                            <span class="text-slate-600">Type:</span> 
                            <span class="font-semibold">${disasterInfo?.name || disaster}</span>
                        </div>
                        <div>
                            <span class="text-slate-600">Severity:</span> 
                            <span class="font-bold ${severity === 'high' ? 'text-red-600' :
                    severity === 'medium' ? 'text-orange-600' :
                        'text-yellow-600'
                }">${severity.toUpperCase()}</span>
                        </div>
                        ${disasterInfo?.description ? `
                            <div class="text-xs text-slate-500 mt-2">
                                ${disasterInfo.description}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `)
        }
    }

    // Only render if there are features to display
    if (filteredFeatures.length === 0) {
        return null
    }

    return (
        <GeoJSON
            key={`disaster-${activeRegion}-${enabledDisasters.join('-')}`}
            data={filteredData}
            style={getDisasterStyle}
            onEachFeature={onEachFeature}
        />
    )
}

DisasterOverlay.propTypes = {
    activeRegion: PropTypes.string,
    enabledDisasters: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default DisasterOverlay
