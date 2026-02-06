import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import PropTypes from 'prop-types'

/**
 * Component to handle smooth map animations when region changes
 */
const MapAnimator = ({ center, zoom }) => {
    const map = useMap()

    useEffect(() => {
        if (center && zoom) {
            map.flyTo(center, zoom, {
                duration: 1.5, // 1.5 seconds animation
                easeLinearity: 0.25
            })
        }
    }, [center, zoom, map])

    return null
}

MapAnimator.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number
}

export default MapAnimator
