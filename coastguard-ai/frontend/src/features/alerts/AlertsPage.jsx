import React from 'react'
import GlassCard from '../../components/ui/GlassCard'
import { motion } from 'framer-motion'

/**
 * Alerts Page - Display weather and coastal alerts
 */
const AlertsPage = () => {
    // Mock alerts data
    const alerts = [
        {
            id: 1,
            type: 'weather',
            severity: 'high',
            title: 'Coastal Flood Warning',
            description: 'High tide combined with strong winds may cause coastal flooding in low-lying areas.',
            time: '2 hours ago',
            active: true
        },
        {
            id: 2,
            type: 'cyclone',
            severity: 'medium',
            title: 'Cyclone Watch',
            description: 'Tropical depression forming in Bay of Bengal. Monitor for updates.',
            time: '5 hours ago',
            active: true
        },
        {
            id: 3,
            type: 'tide',
            severity: 'low',
            title: 'High Tide Alert',
            description: 'Unusually high tide expected at 6:30 PM today.',
            time: '1 day ago',
            active: false
        }
    ]

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high':
                return 'bg-danger/20 border-danger text-danger'
            case 'medium':
                return 'bg-sunset/20 border-sunset text-sunset'
            case 'low':
                return 'bg-safe/20 border-safe text-safe'
            default:
                return 'bg-slate-700/20 border-slate-500 text-slate-300'
        }
    }

    const getIcon = (type) => {
        switch (type) {
            case 'weather':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" clipRule="evenodd" />
                    </svg>
                )
            case 'cyclone':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                )
            case 'tide':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                )
            default:
                return null
        }
    }

    return (
        <div className="h-full w-full overflow-y-auto custom-scrollbar p-4 pb-24">
            <div className="max-w-4xl mx-auto space-y-4">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Alerts</h1>
                    <p className="text-slate-400">Stay informed about coastal conditions and warnings</p>
                </div>

                {/* Active Alerts */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-white mb-3">Active Alerts</h2>
                    {alerts.filter(a => a.active).map((alert, index) => (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="p-4 hover:bg-white/15 transition-all cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${getSeverityColor(alert.severity)}`}>
                                        {getIcon(alert.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getSeverityColor(alert.severity)}`}>
                                                {alert.severity}
                                            </span>
                                        </div>
                                        <p className="text-slate-300 mb-2">{alert.description}</p>
                                        <p className="text-sm text-slate-500">{alert.time}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Past Alerts */}
                <div className="space-y-3 mt-8">
                    <h2 className="text-xl font-semibold text-white mb-3">Past Alerts</h2>
                    {alerts.filter(a => !a.active).map((alert, index) => (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="p-4 opacity-60">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${getSeverityColor(alert.severity)}`}>
                                        {getIcon(alert.type)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">{alert.title}</h3>
                                        <p className="text-slate-300 mb-2">{alert.description}</p>
                                        <p className="text-sm text-slate-500">{alert.time}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AlertsPage
