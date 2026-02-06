import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * EmergencySOS - Emergency button with route calculation
 */
const EmergencySOS = ({ userLocation }) => {
    const [isActivated, setIsActivated] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [smsMessage, setSmsMessage] = useState('')
    const [isSendingSMS, setIsSendingSMS] = useState(false)
    const [smsStatus, setSmsStatus] = useState(null)

    const handleSOSClick = () => {
        setIsActivated(true)
        setShowAlert(true)
        setSmsMessage('EMERGENCY! I need immediate assistance.')

        // TODO: Calculate route to nearest shelter
        console.log('SOS activated for location:', userLocation)

        // Simulate route calculation
        setTimeout(() => {
            console.log('Route calculated')
        }, 1000)
    }

    const handleSendSMS = async () => {
        if (!smsMessage.trim()) return

        setIsSendingSMS(true)
        setSmsStatus(null)

        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001'
            const response = await fetch(`${apiUrl}/api/send-sms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: smsMessage,
                    location: userLocation,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setSmsStatus({ success: true, message: '✅ SMS sent successfully!' })
                console.log('SMS sent:', data)
            } else {
                setSmsStatus({ success: false, message: `❌ ${data.error || 'Failed to send SMS'}` })
                console.error('SMS error:', data)
            }
        } catch (error) {
            setSmsStatus({ success: false, message: '❌ Network error. Is the backend running?' })
            console.error('SMS send error:', error)
        } finally {
            setIsSendingSMS(false)
        }
    }

    return (
        <>
            {/* SOS Button */}
            <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30">
                <motion.button
                    className="sos-button relative"
                    onClick={handleSOSClick}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                    {/* Pulse rings */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-danger"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full bg-danger"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.5,
                        }}
                    />

                    <span className="relative z-10">SOS</span>
                </motion.button>
            </div>

            {/* Emergency Alert Modal */}
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        className="alert-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAlert(false)}
                    >
                        <motion.div
                            className="glass-card p-8 max-w-md w-full mx-4"
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                                onClick={() => setShowAlert(false)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Warning icon */}
                            <div className="flex justify-center mb-6">
                                <motion.div
                                    className="w-24 h-24 rounded-full bg-danger/20 flex items-center justify-center"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        boxShadow: [
                                            '0 0 20px rgba(220, 38, 38, 0.5)',
                                            '0 0 40px rgba(220, 38, 38, 0.7)',
                                            '0 0 20px rgba(220, 38, 38, 0.5)',
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                >
                                    <svg className="w-12 h-12 text-danger" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Alert content */}
                            <h2 className="text-2xl font-bold text-white text-center mb-2">
                                EMERGENCY ACTIVATED
                            </h2>
                            <p className="text-slate-300 text-center mb-6">
                                Calculating safe route to nearest shelter...
                            </p>

                            {/* Info card */}
                            <div className="glass-card p-4 mb-6 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-danger/20 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-danger" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Status</p>
                                        <p className="text-sm font-semibold text-white">Route being calculated</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-safe/20 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-safe" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Nearest Shelter</p>
                                        <p className="text-sm font-semibold text-white">Community Center (2.3 km)</p>
                                    </div>
                                </div>
                            </div>

                            {/* SMS Section */}
                            <div className="glass-card p-4 mb-6">
                                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-ocean" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    Send SMS Alert
                                </h3>
                                <textarea
                                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-ocean"
                                    rows="3"
                                    placeholder="Enter emergency message..."
                                    value={smsMessage}
                                    onChange={(e) => setSmsMessage(e.target.value)}
                                />
                                <button
                                    className="w-full btn-primary flex items-center justify-center gap-2"
                                    onClick={handleSendSMS}
                                    disabled={!smsMessage.trim() || isSendingSMS}
                                >
                                    {isSendingSMS ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                            Send SMS
                                        </>
                                    )}
                                </button>
                                {smsStatus && (
                                    <div className={`mt-3 p-2 rounded-lg text-sm ${smsStatus.success ? 'bg-safe/20 text-safe' : 'bg-danger/20 text-danger'}`}>
                                        {smsStatus.message}
                                    </div>
                                )}
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-3">
                                <button className="btn-primary flex-1">
                                    VIEW SAFE ROUTE
                                </button>
                                <button className="btn-danger flex-1">
                                    CALL EMERGENCY
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

EmergencySOS.propTypes = {
    userLocation: PropTypes.object,
}

export default EmergencySOS
