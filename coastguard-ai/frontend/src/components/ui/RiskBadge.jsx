import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

/**
 * RiskBadge - Color-coded risk level indicator
 * @param {Object} props
 * @param {'low'|'medium'|'high'} props.level - Risk level
 * @param {string} props.label - Optional custom label
 * @param {boolean} props.pulse - Enable pulse animation for high risk
 */
const RiskBadge = ({ level, label, pulse = true }) => {
    const getBadgeClass = () => {
        switch (level.toLowerCase()) {
            case 'low':
            case 'green':
                return 'risk-badge-low'
            case 'medium':
            case 'orange':
                return 'risk-badge-medium'
            case 'high':
            case 'red':
                return 'risk-badge-high'
            default:
                return 'risk-badge-medium'
        }
    }

    const getLabel = () => {
        if (label) return label
        switch (level.toLowerCase()) {
            case 'low':
            case 'green':
                return 'LOW RISK'
            case 'medium':
            case 'orange':
                return 'MODERATE RISK'
            case 'high':
            case 'red':
                return 'HIGH RISK'
            default:
                return level.toUpperCase()
        }
    }

    const shouldPulse = pulse && (level.toLowerCase() === 'high' || level.toLowerCase() === 'red')

    return (
        <motion.div
            className={getBadgeClass()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {shouldPulse && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-danger/30"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            )}
            <span className="relative z-10">{getLabel()}</span>
        </motion.div>
    )
}

RiskBadge.propTypes = {
    level: PropTypes.oneOf(['low', 'medium', 'high', 'green', 'orange', 'red']).isRequired,
    label: PropTypes.string,
    pulse: PropTypes.bool,
}

export default RiskBadge
