import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import CoastGuardMap from './components/map/CoastGuardMap'
import EmergencySOS from './features/emergency/EmergencySOS'
import AlertsPage from './features/alerts/AlertsPage'
import CommunityPage from './features/community/CommunityPage'
import ProfilePage from './features/profile/ProfilePage'
import GlassCard from './components/ui/GlassCard'
import RiskBadge from './components/ui/RiskBadge'
import WeatherWidget from './components/ui/WeatherWidget'
import './styles/index.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
})

function MapView({ currentRisk, userLocation, onLocationChange }) {
  const [tileLayer, setTileLayer] = useState('standard')
  const [activeRegion, setActiveRegion] = useState('all')
  const [enabledDisasters, setEnabledDisasters] = useState(['flood', 'cyclone'])

  // Handle region change with toast notification
  const handleRegionChange = (regionId) => {
    setActiveRegion(regionId)

    // Show toast notification
    const regionNames = {
      north: 'Northern India',
      south: 'Southern India',
      east: 'Eastern India',
      west: 'Western India',
      all: 'All India'
    }

    // Simple toast notification (you can replace with a proper toast library)
    const toast = document.createElement('div')
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 glass-card px-6 py-3 rounded-lg shadow-xl z-[9999] animate-fade-in'
    toast.innerHTML = `
      <div class="flex items-center gap-2 text-white">
        <span class="text-lg">📍</span>
        <span class="font-medium">Navigating to ${regionNames[regionId]}</span>
      </div>
    `
    document.body.appendChild(toast)
    setTimeout(() => {
      toast.style.opacity = '0'
      toast.style.transition = 'opacity 0.3s'
      setTimeout(() => document.body.removeChild(toast), 300)
    }, 2000)
  }

  // Handle disaster toggle
  const handleDisasterToggle = (disasterId) => {
    setEnabledDisasters(prev => {
      if (prev.includes(disasterId)) {
        return prev.filter(id => id !== disasterId)
      } else {
        return [...prev, disasterId]
      }
    })
  }

  return (
    <>
      {/* Main Map */}
      <CoastGuardMap
        userLocation={userLocation}
        onLocationChange={onLocationChange}
        tileLayer={tileLayer}
        onTileLayerChange={setTileLayer}
        activeRegion={activeRegion}
        onRegionChange={handleRegionChange}
        enabledDisasters={enabledDisasters}
        onDisasterToggle={handleDisasterToggle}
      />

      {/* Risk Level Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 md:left-auto md:w-96 space-y-3">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-300">CURRENT RISK LEVEL</h3>
            <RiskBadge level={currentRisk} />
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {currentRisk === 'high' ? 'Severe Coastal Flooding Imminent' :
              currentRisk === 'medium' ? 'Moderate Risk Detected' :
                'Conditions Normal'}
          </p>
          <p className="text-sm text-slate-400">
            Next update in: <span className="text-ocean-light font-semibold">04:32</span>
          </p>
        </GlassCard>

        {/* Weather Widget */}
        <WeatherWidget location={userLocation} />
      </div>
    </>
  )
}

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    {
      path: '/',
      label: 'Map',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      path: '/alerts',
      label: 'Alerts',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      path: '/community',
      label: 'Community',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ]

  return (
    <nav className="nav-glass">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={isActive ? 'nav-item-active' : 'nav-item'}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function AppContent() {
  const [currentRisk, setCurrentRisk] = useState('medium')
  const [userLocation, setUserLocation] = useState(null)

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950">
      <Routes>
        <Route path="/" element={<MapView currentRisk={currentRisk} userLocation={userLocation} onLocationChange={setUserLocation} />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      {/* Emergency SOS Button - visible on all pages */}
      <EmergencySOS userLocation={userLocation} />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
