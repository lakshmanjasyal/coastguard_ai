import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { DISASTER_TYPES } from '../../data/mapData'

const DisasterLegend = ({ enabledDisasters, onDisasterToggle, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`glass-card p-3 sm:p-4 ${className}`}
        >
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-base sm:text-lg">⚠️</span>
                <h3 className="text-xs sm:text-sm font-semibold text-slate-300">DISASTER ZONES</h3>
            </div>

            <div className="space-y-1 sm:space-y-2">
                {Object.values(DISASTER_TYPES).map((disaster) => {
                    const isEnabled = enabledDisasters.includes(disaster.id)

                    return (
                        <button
                            key={disaster.id}
                            onClick={() => onDisasterToggle(disaster.id)}
                            className="w-full flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/30 transition-all duration-200 text-left"
                        >
                            {/* Checkbox */}
                            <div className={`
                                w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-all
                                ${isEnabled
                                    ? 'bg-ocean-light border-ocean-light'
                                    : 'border-slate-500'
                                }
                            `}>
                                {isEnabled && (
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>

                            {/* Icon */}
                            <span className="text-base sm:text-lg">{disaster.icon}</span>

                            {/* Color indicator */}
                            <div
                                className="w-3 h-3 sm:w-4 sm:h-4 rounded"
                                style={{
                                    backgroundColor: disaster.color,
                                    opacity: isEnabled ? disaster.opacity + 0.3 : 0.3
                                }}
                            />

                            {/* Name */}
                            <span className={`text-xs sm:text-sm font-medium ${isEnabled ? 'text-white' : 'text-slate-400'}`}>
                                {disaster.name}
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-700">
                <p className="text-[10px] sm:text-xs text-slate-400">
                    Toggle layers to view different disaster risk zones
                </p>
            </div>
        </motion.div>
    )
}

DisasterLegend.propTypes = {
    enabledDisasters: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDisasterToggle: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default DisasterLegend
