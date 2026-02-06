import React from 'react'
import { useMap } from 'react-leaflet'
import GlassCard from '../ui/GlassCard'

/**
 * LocationButton - Manual location request button
 */
const LocationButton = () => {
    const map = useMap()

    const handleLocationRequest = () => {
        console.log('🔍 Requesting location...')

        if (!navigator.geolocation) {
            alert('❌ Geolocation is not supported by your browser')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                console.log('✅ Location acquired:', latitude, longitude)

                map.setView([latitude, longitude], 13)

                alert(`✅ Location Found!\n\nLatitude: ${latitude.toFixed(4)}\nLongitude: ${longitude.toFixed(4)}`)
            },
            (error) => {
                console.error('❌ Location error:', error)

                let message = '❌ Could not get your location\n\n'

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message += 'Permission denied. Please allow location access in your browser settings.'
                        break
                    case error.POSITION_UNAVAILABLE:
                        message += 'Location information is unavailable. Check your device settings.'
                        break
                    case error.TIMEOUT:
                        message += 'Location request timed out. Make sure location services are enabled.'
                        break
                    default:
                        message += 'An unknown error occurred.'
                }

                alert(message)
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0
            }
        )
    }

    return (
        <button
            onClick={handleLocationRequest}
            className="absolute top-20 left-4 z-30 glass-card p-3 rounded-xl hover:bg-white/20 transition-all group"
            title="Use my current location"
        >
            <svg
                className="w-6 h-6 text-ocean-light group-hover:text-ocean"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        </button>
    )
}

export default LocationButton
