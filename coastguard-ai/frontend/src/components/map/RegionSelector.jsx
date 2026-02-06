import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { INDIAN_REGIONS } from '../../data/mapData'

const RegionSelector = ({ activeRegion, onRegionSelect, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleRegionClick = (regionId) => {
        onRegionSelect(regionId)
        setIsOpen(false)
    }

    const currentRegion = INDIAN_REGIONS[activeRegion] || INDIAN_REGIONS.all

    return (
        <div className={`relative ${className}`}>
            {/* Dropdown Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass-card px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:bg-slate-700/50"
            >
                <span className="text-lg">📍</span>
                <span className="hidden sm:inline text-slate-300">{currentRegion.name}</span>
                <svg
                    className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown content */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full mt-2 right-0 min-w-[200px] glass-card rounded-lg overflow-hidden shadow-xl z-50 
                                       sm:relative sm:top-auto sm:mt-2
                                       max-sm:fixed max-sm:bottom-20 max-sm:left-4 max-sm:right-4 max-sm:top-auto max-sm:min-w-0"
                        >
                            <div className="p-2">
                                <div className="text-xs font-semibold text-slate-400 px-3 py-2">
                                    📍 SELECT REGION
                                </div>
                                <div className="space-y-1">
                                    {Object.values(INDIAN_REGIONS).map((region) => {
                                        const isActive = activeRegion === region.id
                                        return (
                                            <button
                                                key={region.id}
                                                onClick={() => handleRegionClick(region.id)}
                                                className={`
                                                    w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                                    flex items-center gap-2 text-left
                                                    ${isActive
                                                        ? 'bg-ocean-light text-white'
                                                        : 'text-slate-300 hover:bg-slate-700/50'
                                                    }
                                                `}
                                            >
                                                <span
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: region.color }}
                                                />
                                                <span>{region.name}</span>
                                                {region.id === 'all' && (
                                                    <span className="ml-auto text-xs text-slate-400">Reset</span>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

RegionSelector.propTypes = {
    activeRegion: PropTypes.string,
    onRegionSelect: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default RegionSelector
