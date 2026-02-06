import React, { useEffect, useState } from 'react'
import { getCurrentWeather } from '../../services/weatherService'
import GlassCard from '../ui/GlassCard'
import { motion } from 'framer-motion'

/**
 * WeatherWidget - Displays current weather conditions
 */
const WeatherWidget = ({ location }) => {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWeather = async () => {
            if (location) {
                setLoading(true)
                const data = await getCurrentWeather(location.lat, location.lng)
                setWeather(data)
                setLoading(false)
            }
        }

        fetchWeather()
        // Refresh every 10 minutes
        const interval = setInterval(fetchWeather, 600000)
        return () => clearInterval(interval)
    }, [location])

    if (loading) {
        return (
            <GlassCard className="p-4">
                <div className="flex items-center justify-center">
                    <div className="spinner"></div>
                </div>
            </GlassCard>
        )
    }

    if (!weather) return null

    const getWeatherIcon = (icon) => {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }

    return (
        <GlassCard className="p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Weather</p>
                    <div className="flex items-center gap-2">
                        <img
                            src={getWeatherIcon(weather.icon)}
                            alt={weather.description}
                            className="w-12 h-12"
                        />
                        <div>
                            <p className="text-3xl font-bold text-white">
                                {Math.round(weather.temperature)}°C
                            </p>
                            <p className="text-sm text-slate-300 capitalize">
                                {weather.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-right space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-ocean-light" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-300">{weather.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-ocean-light" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-300">{weather.windSpeed} m/s</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-400">Feels like</span>
                        <span className="text-white font-semibold">{Math.round(weather.feelsLike)}°C</span>
                    </div>
                </div>
            </div>
        </GlassCard>
    )
}

export default WeatherWidget
