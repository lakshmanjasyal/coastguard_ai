# Weather API Integration Guide

## Recommended Weather APIs for India

### 1. **OpenWeatherMap** (Recommended)
- **Free Tier**: 1,000 calls/day, 60 calls/minute
- **Coverage**: Global including India
- **Data**: Current weather, 5-day forecast, alerts
- **Sign Up**: https://openweathermap.org/api

#### Setup Steps:
```bash
# 1. Sign up at https://openweathermap.org/users/sign_up
# 2. Get your API key from https://home.openweathermap.org/api_keys
# 3. Add to .env file
```

#### Example API Calls:
```javascript
// Current Weather
const API_KEY = 'your_api_key_here'
const lat = 13.08
const lon = 80.27

// Current weather
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

// 5-day forecast (3-hour intervals)
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

// Weather alerts
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=minutely,hourly`)
```

---

### 2. **WeatherAPI.com**
- **Free Tier**: 1 million calls/month
- **Coverage**: Global including India
- **Data**: Current, forecast, marine, astronomy
- **Sign Up**: https://www.weatherapi.com/signup.aspx

#### Example API Call:
```javascript
const API_KEY = 'your_api_key_here'
const location = '13.08,80.27'

// 3-day forecast
fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&alerts=yes`)
```

---

### 3. **India Meteorological Department (IMD)** (Official)
- **Source**: Government of India
- **Coverage**: India-specific, highly accurate
- **Access**: Requires registration
- **Website**: https://mausam.imd.gov.in/

**Note**: IMD doesn't have a public REST API. You may need to:
- Use their RSS feeds
- Scrape their website (check terms of service)
- Contact them for API access

---

### 4. **Tomorrow.io** (formerly ClimaCell)
- **Free Tier**: 500 calls/day
- **Coverage**: Global with hyperlocal data
- **Data**: Weather, air quality, pollen
- **Sign Up**: https://www.tomorrow.io/weather-api/

---

## Implementation in CoastGuard AI

### Step 1: Install Dependencies
```bash
npm install axios
```

### Step 2: Create Environment Variables
Create `frontend/.env`:
```env
VITE_WEATHER_API_KEY=your_openweathermap_key_here
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

### Step 3: Create Weather Service
I'll create `src/services/weatherService.js` with functions to fetch weather data.

### Step 4: Create Weather Components
- Weather card showing current conditions
- Forecast timeline (3-5 days)
- Weather alerts integration

---

## Sample Response Structure

### OpenWeatherMap Current Weather:
```json
{
  "weather": [
    {
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  "main": {
    "temp": 28.5,
    "feels_like": 32.1,
    "humidity": 85,
    "pressure": 1008
  },
  "wind": {
    "speed": 7.5,
    "deg": 180
  },
  "clouds": {
    "all": 90
  },
  "dt": 1707223200
}
```

### 5-Day Forecast:
```json
{
  "list": [
    {
      "dt": 1707223200,
      "main": {
        "temp": 28.5,
        "humidity": 85
      },
      "weather": [
        {
          "main": "Rain",
          "description": "moderate rain"
        }
      ],
      "wind": {
        "speed": 7.5
      },
      "dt_txt": "2024-02-06 12:00:00"
    }
    // ... more entries
  ]
}
```

---

## Cost Comparison

| Provider | Free Tier | Paid Plans Start At |
|----------|-----------|---------------------|
| OpenWeatherMap | 1,000 calls/day | $40/month (100K calls) |
| WeatherAPI.com | 1M calls/month | Free tier sufficient |
| Tomorrow.io | 500 calls/day | $99/month |

**Recommendation**: Start with **WeatherAPI.com** for the generous free tier, or **OpenWeatherMap** for better documentation.

---

## Next Steps

I'll now implement:
1. Weather service with API integration
2. Weather display components
3. Navigation routing for Alerts, Community, Profile pages
4. Weather alerts integration
