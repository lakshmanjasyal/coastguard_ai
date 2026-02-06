export const INDIAN_REGIONS = {
    north: {
        id: 'north',
        name: 'Northern India',
        center: [28.7041, 77.1025],  // Delhi
        zoom: 6,
        states: [
            { name: 'Delhi', coords: [28.7041, 77.1025] },
            { name: 'Uttar Pradesh', coords: [26.8467, 80.9462] },
            { name: 'Bihar', coords: [25.0961, 85.3131] },
            { name: 'Punjab', coords: [31.1471, 75.3412] },
            { name: 'Haryana', coords: [29.0588, 76.0856] }
        ],
        commonDisasters: ['landslide', 'flood'],
        riskLevel: 'medium',
        color: '#ef4444'
    },
    south: {
        id: 'south',
        name: 'Southern India',
        center: [12.9716, 77.5946],  // Bangalore
        zoom: 6,
        states: [
            { name: 'Kerala', coords: [10.8505, 76.2711] },
            { name: 'Karnataka', coords: [15.3173, 75.7139] },
            { name: 'Tamil Nadu', coords: [11.1271, 78.6569] },
            { name: 'Andhra Pradesh', coords: [15.9129, 79.7400] },
            { name: 'Telangana', coords: [18.1124, 79.0193] }
        ],
        commonDisasters: ['flood', 'cyclone', 'tsunami'],
        riskLevel: 'high',
        color: '#3b82f6'
    },
    east: {
        id: 'east',
        name: 'Eastern India',
        center: [22.5726, 88.3639],  // Kolkata
        zoom: 6,
        states: [
            { name: 'West Bengal', coords: [22.9868, 87.8550] },
            { name: 'Odisha', coords: [20.9517, 85.0985] },
            { name: 'Jharkhand', coords: [23.6102, 85.2799] },
            { name: 'Assam', coords: [26.2006, 92.9376] }
        ],
        commonDisasters: ['cyclone', 'flood'],
        riskLevel: 'high',
        color: '#f59e0b'
    },
    west: {
        id: 'west',
        name: 'Western India',
        center: [19.0760, 72.8777],  // Mumbai
        zoom: 6,
        states: [
            { name: 'Maharashtra', coords: [19.7515, 75.7139] },
            { name: 'Gujarat', coords: [22.2587, 71.1924] },
            { name: 'Rajasthan', coords: [27.0238, 74.2179] },
            { name: 'Goa', coords: [15.2993, 74.1240] }
        ],
        commonDisasters: ['cyclone', 'flood', 'drought'],
        riskLevel: 'medium',
        color: '#8b5cf6'
    },
    all: {
        id: 'all',
        name: 'All India',
        center: [20.5937, 78.9629],  // India center
        zoom: 5,
        states: [],
        commonDisasters: ['flood', 'cyclone', 'landslide', 'tsunami'],
        riskLevel: 'varied',
        color: '#10b981'
    }
}

export const DISASTER_TYPES = {
    landslide: {
        id: 'landslide',
        name: 'Landslides',
        color: '#92400e',      // Brown
        opacity: 0.4,
        icon: '🏔️',
        description: 'Risk of terrain collapse'
    },
    flood: {
        id: 'flood',
        name: 'Floods',
        color: '#1e40af',      // Blue
        opacity: 0.5,
        icon: '🌊',
        description: 'Flood-prone areas'
    },
    cyclone: {
        id: 'cyclone',
        name: 'Cyclones',
        color: '#f59e0b',      // Amber
        opacity: 0.45,
        icon: '🌀',
        description: 'Cyclone impact zones'
    },
    tsunami: {
        id: 'tsunami',
        name: 'Tsunamis',
        color: '#7c3aed',      // Purple
        opacity: 0.5,
        icon: '🌊',
        description: 'Tsunami risk areas'
    },
    drought: {
        id: 'drought',
        name: 'Droughts',
        color: '#dc2626',      // Red
        opacity: 0.35,
        icon: '☀️',
        description: 'Drought-affected regions'
    }
}

export const TILE_LAYERS = {
    standard: {
        id: 'standard',
        name: 'Standard',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        icon: '🗺️'
    },
    satellite: {
        id: 'satellite',
        name: 'Satellite',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '© Esri, Maxar, Earthstar Geographics',
        maxZoom: 18,
        icon: '🛰️'
    },
    terrain: {
        id: 'terrain',
        name: 'Terrain',
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: '© OpenTopoMap contributors',
        maxZoom: 17,
        icon: '🏔️'
    }
}
