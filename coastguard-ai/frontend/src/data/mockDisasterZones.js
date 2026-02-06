/**
 * Mock disaster zone data for different regions of India
 * In production, this would come from real disaster APIs
 */

export const mockDisasterZones = {
    type: 'FeatureCollection',
    features: [
        // NORTH INDIA - Landslides
        {
            type: 'Feature',
            properties: {
                region: 'north',
                disaster: 'landslide',
                severity: 'high',
                name: 'Uttarakhand Landslide Belt'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [78.0, 30.0],
                    [80.0, 30.0],
                    [80.0, 31.5],
                    [78.0, 31.5],
                    [78.0, 30.0]
                ]]
            }
        },
        {
            type: 'Feature',
            properties: {
                region: 'north',
                disaster: 'flood',
                severity: 'medium',
                name: 'Yamuna Flood Plain'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [77.0, 28.5],
                    [77.5, 28.5],
                    [77.5, 29.0],
                    [77.0, 29.0],
                    [77.0, 28.5]
                ]]
            }
        },

        // SOUTH INDIA - Floods, Cyclones, Tsunamis
        {
            type: 'Feature',
            properties: {
                region: 'south',
                disaster: 'flood',
                severity: 'high',
                name: 'Kerala Monsoon Flood Zone'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [75.5, 9.5],
                    [77.0, 9.5],
                    [77.0, 11.0],
                    [75.5, 11.0],
                    [75.5, 9.5]
                ]]
            }
        },
        {
            type: 'Feature',
            properties: {
                region: 'south',
                disaster: 'cyclone',
                severity: 'high',
                name: 'Tamil Nadu Cyclone Belt'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [79.5, 10.5],
                    [80.5, 10.5],
                    [80.5, 11.5],
                    [79.5, 11.5],
                    [79.5, 10.5]
                ]]
            }
        },
        {
            type: 'Feature',
            properties: {
                region: 'south',
                disaster: 'tsunami',
                severity: 'medium',
                name: 'Coastal Tsunami Risk Zone'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [76.0, 8.0],
                    [77.5, 8.0],
                    [77.5, 9.0],
                    [76.0, 9.0],
                    [76.0, 8.0]
                ]]
            }
        },

        // EAST INDIA - Cyclones, Floods
        {
            type: 'Feature',
            properties: {
                region: 'east',
                disaster: 'cyclone',
                severity: 'high',
                name: 'Odisha Cyclone Corridor'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [84.5, 19.0],
                    [87.0, 19.0],
                    [87.0, 21.0],
                    [84.5, 21.0],
                    [84.5, 19.0]
                ]]
            }
        },
        {
            type: 'Feature',
            properties: {
                region: 'east',
                disaster: 'flood',
                severity: 'high',
                name: 'Brahmaputra Flood Plain'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [89.0, 25.0],
                    [92.0, 25.0],
                    [92.0, 27.0],
                    [89.0, 27.0],
                    [89.0, 25.0]
                ]]
            }
        },

        // WEST INDIA - Cyclones, Floods, Droughts
        {
            type: 'Feature',
            properties: {
                region: 'west',
                disaster: 'cyclone',
                severity: 'medium',
                name: 'Gujarat Coastal Cyclone Zone'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [68.0, 20.0],
                    [72.0, 20.0],
                    [72.0, 23.0],
                    [68.0, 23.0],
                    [68.0, 20.0]
                ]]
            }
        },
        {
            type: 'Feature',
            properties: {
                region: 'west',
                disaster: 'flood',
                severity: 'medium',
                name: 'Mumbai Monsoon Flood Zone'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [72.7, 18.9],
                    [73.0, 18.9],
                    [73.0, 19.3],
                    [72.7, 19.3],
                    [72.7, 18.9]
                ]]
            }
        },
        {
            type: 'Feature',
            properties: {
                region: 'west',
                disaster: 'drought',
                severity: 'high',
                name: 'Rajasthan Drought Region'
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [70.0, 25.0],
                    [75.0, 25.0],
                    [75.0, 28.0],
                    [70.0, 28.0],
                    [70.0, 25.0]
                ]]
            }
        }
    ]
}
