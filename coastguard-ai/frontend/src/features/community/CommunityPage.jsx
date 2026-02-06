import React, { useState } from 'react'
import GlassCard from '../../components/ui/GlassCard'
import { motion } from 'framer-motion'

/**
 * Community Page - Crowdsourced coastal observations
 */
const CommunityPage = () => {
    const [activeTab, setActiveTab] = useState('feed')

    // Mock community observations
    const observations = [
        {
            id: 1,
            user: 'Ravi Kumar',
            location: 'Ennore Creek',
            type: 'flooding',
            description: 'Water level rising rapidly near the bridge. Road partially submerged.',
            timestamp: '15 minutes ago',
            verified: true,
            image: null,
            upvotes: 12
        },
        {
            id: 2,
            user: 'Priya S',
            location: 'Marina Beach',
            type: 'tide',
            description: 'Unusually high waves observed. Strong undertow present.',
            timestamp: '1 hour ago',
            verified: true,
            image: null,
            upvotes: 8
        },
        {
            id: 3,
            user: 'Arun M',
            location: 'Pulicat Lake',
            type: 'weather',
            description: 'Heavy rainfall started. Visibility reduced.',
            timestamp: '2 hours ago',
            verified: false,
            image: null,
            upvotes: 5
        }
    ]

    const getTypeIcon = (type) => {
        switch (type) {
            case 'flooding':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" clipRule="evenodd" />
                    </svg>
                )
            case 'tide':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                )
            case 'weather':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                    </svg>
                )
            default:
                return null
        }
    }

    const getTypeColor = (type) => {
        switch (type) {
            case 'flooding':
                return 'bg-danger/20 text-danger'
            case 'tide':
                return 'bg-ocean/20 text-ocean-light'
            case 'weather':
                return 'bg-sunset/20 text-sunset'
            default:
                return 'bg-slate-700/20 text-slate-300'
        }
    }

    return (
        <div className="h-full w-full overflow-y-auto custom-scrollbar p-4 pb-24">
            <div className="max-w-4xl mx-auto space-y-4">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
                    <p className="text-slate-400">Real-time observations from coastal communities</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('feed')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === 'feed'
                            ? 'bg-ocean text-white'
                            : 'glass-card text-slate-300 hover:bg-white/15'
                            }`}
                    >
                        Feed
                    </button>
                    <button
                        onClick={() => setActiveTab('submit')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === 'submit'
                            ? 'bg-ocean text-white'
                            : 'glass-card text-slate-300 hover:bg-white/15'
                            }`}
                    >
                        Submit Report
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'feed' ? (
                    <div className="space-y-3">
                        {observations.map((obs, index) => (
                            <motion.div
                                key={obs.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard className="p-4">
                                    <div className="flex items-start gap-4">
                                        {/* User Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center text-white font-bold">
                                            {obs.user.charAt(0)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-white">{obs.user}</h3>
                                                        {obs.verified && (
                                                            <svg className="w-5 h-5 text-safe" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-slate-400">{obs.location} • {obs.timestamp}</p>
                                                </div>
                                                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${getTypeColor(obs.type)}`}>
                                                    {getTypeIcon(obs.type)}
                                                    <span className="text-xs font-semibold capitalize">{obs.type}</span>
                                                </div>
                                            </div>

                                            <p className="text-slate-200 mb-3">{obs.description}</p>

                                            {/* Actions */}
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center gap-1 text-slate-400 hover:text-ocean-light transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                    <span className="text-sm font-semibold">{obs.upvotes}</span>
                                                </button>
                                                <button className="text-slate-400 hover:text-ocean-light transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Submit Observation</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>
                                <input
                                    type="text"
                                    className="input-glass w-full"
                                    placeholder="Enter location"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Type</label>
                                <select className="input-glass w-full">
                                    <option>Flooding</option>
                                    <option>High Tide</option>
                                    <option>Weather</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
                                <textarea
                                    className="input-glass w-full"
                                    rows="4"
                                    placeholder="Describe what you're observing..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Photo (Optional)</label>
                                <div className="glass-card p-8 text-center cursor-pointer hover:bg-white/15 transition-all">
                                    <svg className="w-12 h-12 mx-auto text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-slate-400">Click to upload photo</p>
                                </div>
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                Submit Report
                            </button>
                        </form>
                    </GlassCard>
                )}
            </div>
        </div>
    )
}

export default CommunityPage
