# 🌊 CoastGuard AI

**Coastal Emergency Alert System with Real-Time Location Tracking & SMS Notifications**

A comprehensive emergency response system for coastal regions, combining interactive mapping, real-time weather tracking, and emergency SMS alerts to multiple contacts.

---

## ✨ Features

- 🗺️ **Interactive Risk Maps** - Real-time location tracking with Leaflet maps
- 🚨 **Emergency SOS** - One-tap emergency alerts with SMS notifications
- 📱 **Multi-Contact SMS** - Send emergency alerts to multiple contacts simultaneously
- 📍 **Address Geocoding** - Converts GPS coordinates to readable addresses via Google Maps
- 🌤️ **Weather Integration** - Real-time weather data display
- 👥 **Community Observations** - Crowdsourced coastal observations
- 🎨 **Modern UI** - Beautiful glassmorphism design with dark mode
- 📲 **Mobile Responsive** - Works seamlessly on all devices

---

## 🛠️ Tech Stack

### Frontend
- **React** + **Vite** - Modern development setup
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Leaflet** - Interactive maps
- **Axios** - HTTP client

### Backend
- **Node.js** + **Express** - RESTful API server
- **Twilio** - SMS messaging service
- **Google Maps Geocoding API** - Address resolution
- **CORS** - Cross-origin resource sharing

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Required API Keys

You'll need to sign up for these free services:

1. **Twilio Account** - For SMS messaging
   - Sign up: [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
   - Get: Account SID, Auth Token, Phone Number

2. **Google Maps API** - For geocoding (optional but recommended)
   - Sign up: [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - Enable: Geocoding API
   - Get: API Key

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd coastguard-ai
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `frontend/.env`:**
```env
VITE_OPENWEATHER_API_KEY=demo
VITE_BACKEND_API_URL=http://localhost:3001
```

### 3. Backend Setup

```bash
# Navigate to backend directory (from project root)
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `backend/.env`:**
```env
# Twilio Credentials (Required)
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890

# Emergency Contacts (Required) - comma-separated for multiple contacts
USER_PHONE_NUMBERS=+919876543210,+919123456789

# Server
PORT=3001

# Google Maps API (Optional - for address geocoding)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 4. Run the Application

You need to run both frontend and backend servers:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

Backend API will be running on:
```
http://localhost:3001
```

---

## 📱 How to Use

### Emergency SOS

1. **Location Detection** - App automatically detects your location
2. **Click SOS Button** - Red SOS button at the bottom of the screen
3. **Send Alert** - Click "Send SMS" in the emergency modal
4. **Confirmation** - You'll see "✅ SMS sent successfully!"

### SMS Message Format

**With Google Maps API (Address):**
```
EMERGENCY! I need immediate assistance.

Address: 123 Beach Road, Chennai, Tamil Nadu 600001, India
```

**Without Google Maps API (Coordinates):**
```
EMERGENCY! I need immediate assistance.

Location: 13.0827, 80.2707
```

---

## ⚙️ Configuration

### Multiple Emergency Contacts

Edit `backend/.env` to add multiple phone numbers:

```env
# Single contact
USER_PHONE_NUMBERS=+919876543210

# Multiple contacts (comma-separated)
USER_PHONE_NUMBERS=+919876543210,+919123456789,+918765432109
```

All contacts will receive the SMS simultaneously!

### Twilio Trial Account

**Trial Account Limitations:**
- Adds "Sent from your Twilio trial account -" prefix
- Can only send to verified phone numbers
- To verify numbers: [Twilio Console → Verified Caller IDs](https://console.twilio.com/us1/develop/phone-numbers/manage/verified)

**Upgrade for Production:**
- No prefix in messages
- Send to any phone number
- Cost: ~₹0.60 per SMS (~$0.0075 USD)
- Upgrade: [Twilio Console → Billing](https://console.twilio.com/billing/upgrade)

### Google Maps Geocoding Setup

1. Enable Geocoding API: [Google Cloud Console](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)
2. Enable billing (free tier: 40,000 requests/month)
3. Add API key to `backend/.env`
4. Restart backend server

---

## 📁 Project Structure

```
coastguard-ai/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── CoastGuardMap.jsx
│   │   │   ├── WeatherInfo.jsx
│   │   │   ├── EmergencySOS.jsx
│   │   │   └── ...
│   │   ├── App.jsx          # Main app component
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── index.html           # HTML template
│   ├── package.json         # Dependencies
│   └── .env                 # Environment variables
│
├── backend/                 # Node.js backend server
│   ├── server.js            # Express server + SMS logic
│   ├── package.json         # Dependencies
│   └── .env                 # Environment variables (API keys)
│
├── docs/                    # Documentation
│   └── WEATHER_API_GUIDE.md
│
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## 🧪 Testing

### Test SMS Functionality

```bash
# Make sure backend is running
cd backend
npm start

# In another terminal, you can use curl to test:
curl -X POST http://localhost:3001/api/send-sms \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test emergency alert",
    "location": {
      "lat": 13.0827,
      "lng": 80.2707
    }
  }'
```

### Check Backend Health

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "CoastGuard AI Backend is running"
}
```

---

## 🐛 Troubleshooting

### SMS Not Sending

1. **Check Twilio Credentials** - Verify `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` in `.env`
2. **Check Phone Numbers** - Ensure `USER_PHONE_NUMBERS` includes country code (e.g., +91 for India)
3. **Trial Account** - Verify recipient phone numbers in [Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/verified)
4. **Restart Backend** - After changing `.env`, restart the backend server

### Frontend Not Loading

1. **Check Port** - Make sure port 5173 is not in use
2. **Backend URL** - Verify `VITE_BACKEND_API_URL` in `frontend/.env` is correct
3. **Clear Cache** - Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

### Map Not Showing

1. **Location Permission** - Allow location access in your browser
2. **HTTPS** - Some browsers require HTTPS for geolocation (use localhost for development)

### Geocoding Not Working

1. **API Key** - Check `GOOGLE_MAPS_API_KEY` in `backend/.env`
2. **API Enabled** - Ensure Geocoding API is enabled in Google Cloud Console
3. **Billing** - Verify billing is enabled (free tier available)

---

## 💰 Cost Estimates

### Twilio SMS
- **Trial:** Free (with limitations)
- **Paid:** ~₹0.60 per SMS (~$0.0075 USD)
- **Example:** 100 emergencies/month to 3 contacts = ~₹180 (~$2.25)

### Google Maps API
- **Free Tier:** 40,000 geocoding requests/month
- **Your Usage:** ~20-50 requests/month
- **Cost:** $0.00 (within free tier)

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
```

Deploy the `dist/` folder to Vercel or Netlify.

### Backend (Railway/Render/Heroku)

1. Push to GitHub
2. Connect to Railway/Render
3. Set environment variables in platform dashboard
4. Deploy!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Twilio** - SMS messaging service
- **Google Maps** - Geocoding API
- **Leaflet** - Open-source mapping library
- **OpenWeatherMap** - Weather data
- Coastal communities for inspiration

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the [documentation](docs/)
- Review the troubleshooting section above

---

## 🎯 Roadmap

- [ ] Offline PWA support
- [ ] Voice alerts in multiple languages
- [ ] Integration with emergency services
- [ ] Historical disaster data visualization
- [ ] Community shelters database
- [ ] WhatsApp Business API integration

---

**Built with ❤️ for coastal safety and emergency response**
