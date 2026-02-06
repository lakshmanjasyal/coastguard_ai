import React from 'react'
import GlassCard from '../../components/ui/GlassCard'

/**
 * Profile Page - User settings and preferences
 */
const ProfilePage = () => {
    return (
        <div className="h-full w-full overflow-y-auto custom-scrollbar p-4 pb-24">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
                    <p className="text-slate-400">Manage your account and preferences</p>
                </div>

                {/* User Info */}
                <GlassCard className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 rounded-full bg-ocean flex items-center justify-center text-white text-3xl font-bold">
                            U
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">User</h2>
                            <p className="text-slate-400">Chennai, Tamil Nadu</p>
                        </div>
                    </div>
                    <button className="btn-secondary">Edit Profile</button>
                </GlassCard>

                {/* Settings */}
                <GlassCard className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-white">Notifications</p>
                                <p className="text-sm text-slate-400">Receive alerts and updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ocean"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-white">Location Services</p>
                                <p className="text-sm text-slate-400">Allow location tracking</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ocean"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-white">Offline Mode</p>
                                <p className="text-sm text-slate-400">Cache data for offline use</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ocean"></div>
                            </label>
                        </div>
                    </div>
                </GlassCard>

                {/* Language */}
                <GlassCard className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Language</h3>
                    <select className="input-glass w-full">
                        <option>English</option>
                        <option>தமிழ் (Tamil)</option>
                        <option>తెలుగు (Telugu)</option>
                        <option>ଓଡ଼ିଆ (Odia)</option>
                        <option>हिन्दी (Hindi)</option>
                        <option>বাংলা (Bengali)</option>
                    </select>
                </GlassCard>

                {/* About */}
                <GlassCard className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">About</h3>
                    <div className="space-y-2 text-slate-300">
                        <p><span className="font-semibold">Version:</span> 1.0.0 (MVP)</p>
                        <p><span className="font-semibold">Build:</span> 2024.02.06</p>
                        <p className="text-sm text-slate-400 mt-4">
                            CoastGuard AI - Fusing satellite intelligence with indigenous coastal wisdom for climate resilient living.
                        </p>
                    </div>
                </GlassCard>

                {/* Logout */}
                <button className="btn-danger w-full">Logout</button>
            </div>
        </div>
    )
}

export default ProfilePage
