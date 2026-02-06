import axios from 'axios'

// Weather API Configuration
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo'
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5'

/**
 * Weather Service for fetching weather data
 * Uses OpenWeatherMap API
 * 
 * To use:
 * 1. Sign up at https://openweathermap.org/api
 * 2. Get your API key
 * 3. Add to frontend/.env: VITE_WEATHER_API_KEY=your_key_here
 */

/**
 * Get current weather for a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
export const getCurrentWeather = async (lat, lon) => {
    try {
        const response = await axios.get(`${WEATHER_API_BASE}/weather`, {
            params: {
                lat,
                lon,
                appid: WEATHER_API_KEY,
                units: 'metric' // Celsius
            }
        })

        return {
            temperature: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            windSpeed: response.data.wind.speed,
            windDirection: response.data.wind.deg,
            description: response.data.weather[0].description,
            main: response.data.weather[0].main,
            icon: response.data.weather[0].icon,
            clouds: response.data.clouds.all,
            timestamp: response.data.dt
        }
    } catch (error) {
        console.error('Error fetching current weather:', error)
        // Return mock data if API fails
        return getMockCurrentWeather()
    }
}

/**
 * Get 5-day weather forecast
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Array>} Forecast data
 */
export const getWeatherForecast = async (lat, lon) => {
    try {
        const response = await axios.get(`${WEATHER_API_BASE}/forecast`, {
            params: {
                lat,
                lon,
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        })

        // Group by day and get daily summary
        const dailyForecasts = []
        const grouped = {}

        response.data.list.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString()
            if (!grouped[date]) {
                grouped[date] = []
            }
            grouped[date].push(item)
        })

        Object.keys(grouped).slice(0, 5).forEach(date => {
            const dayData = grouped[date]
            const temps = dayData.map(d => d.main.temp)
            const midday = dayData[Math.floor(dayData.length / 2)]

            dailyForecasts.push({
                date: new Date(dayData[0].dt * 1000),
                tempMax: Math.max(...temps),
                tempMin: Math.min(...temps),
                description: midday.weather[0].description,
                main: midday.weather[0].main,
                icon: midday.weather[0].icon,
                humidity: midday.main.humidity,
                windSpeed: midday.wind.speed
            })
        })

        return dailyForecasts
    } catch (error) {
        console.error('Error fetching weather forecast:', error)
        return getMockForecast()
    }
}

/**
 * Get weather alerts for a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Array>} Weather alerts
 */
export const getWeatherAlerts = async (lat, lon) => {
    try {
        const response = await axios.get(`${WEATHER_API_BASE}/onecall`, {
            params: {
                lat,
                lon,
                appid: WEATHER_API_KEY,
                exclude: 'minutely,hourly',
                units: 'metric'
            }
        })

        return response.data.alerts || []
    } catch (error) {
        console.error('Error fetching weather alerts:', error)
        return getMockAlerts()
    }
}

/**
 * Mock data for development/fallback
 */
const getMockCurrentWeather = () => ({
    temperature: 28.5,
    feelsLike: 32.1,
    humidity: 85,
    pressure: 1008,
    windSpeed: 7.5,
    windDirection: 180,
    description: 'moderate rain',
    main: 'Rain',
    icon: '10d',
    clouds: 90,
    timestamp: Date.now() / 1000
})

const getMockForecast = () => {
    const today = new Date()
    return Array.from({ length: 5 }, (_, i) => {
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        return {
            date,
            tempMax: 30 + Math.random() * 3,
            tempMin: 24 + Math.random() * 2,
            description: i % 2 === 0 ? 'partly cloudy' : 'light rain',
            main: i % 2 === 0 ? 'Clouds' : 'Rain',
            icon: i % 2 === 0 ? '02d' : '10d',
            humidity: 75 + Math.random() * 15,
            windSpeed: 5 + Math.random() * 5
        }
    })
}

const getMockAlerts = () => [
    {
        event: 'Coastal Flood Warning',
        start: Date.now() / 1000,
        end: (Date.now() / 1000) + 86400,
        description: 'High tide combined with strong winds may cause coastal flooding in low-lying areas.',
        severity: 'moderate'
    }
]

export default {
    getCurrentWeather,
    getWeatherForecast,
    getWeatherAlerts
}
