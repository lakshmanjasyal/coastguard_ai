import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

/**
 * GlassCard - Reusable glassmorphism card component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Enable hover effect
 * @param {boolean} props.animate - Enable entrance animation
 */
const GlassCard = ({
    children,
    className = '',
    hover = false,
    animate = true,
    ...props
}) => {
    const cardClass = hover ? 'glass-card-hover' : 'glass-card'

    const CardWrapper = animate ? motion.div : 'div'

    const animationProps = animate ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: 'easeOut' }
    } : {}

    return (
        <CardWrapper
            className={`${cardClass} ${className}`}
            {...animationProps}
            {...props}
        >
            {children}
        </CardWrapper>
    )
}

GlassCard.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    hover: PropTypes.bool,
    animate: PropTypes.bool,
}

export default GlassCard
