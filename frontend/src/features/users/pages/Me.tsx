import { useState } from 'react'
import { useAuthSession } from '@features/auth/hooks/useAuthSession'
import { toast } from 'react-toastify'
import { authApi } from '@features/users/services/profile.api'
import { changePasswordSchema, updateProfileSchema } from '../schemas/me.schema'

export default function Me() {
    const { user, refresh } = useAuthSession()

    // Edit mode states
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)

    const [savingProfile, setSavingProfile] = useState(false)
    const [savingPassword, setSavingPassword] = useState(false)

    // Form states
    const [profileForm, setProfileForm] = useState({
        fullName: user?.fullName || '',
        email: user?.email || ''
    })
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: ''
    })

    if (!user) return null

    const updateNameEmail = async () => {
        try {
            updateProfileSchema.parse(profileForm)
            setSavingProfile(true)

            await authApi.updateProfile(profileForm)

            toast.success('Profile updated')
            setIsEditingProfile(false)
            refresh()
        } catch (err: unknown) {
            if (err instanceof Error) toast.error(err.message || 'Update failed')
            else toast.error('Update failed')
        } finally {
            setSavingProfile(false)
        }
    }

    const updatePassword = async () => {
        try {
            changePasswordSchema.parse(passwordForm)
            setSavingPassword(true)

            await authApi.changePassword(passwordForm)

            toast.success('Password updated')
            setIsEditingPassword(false)
            setPasswordForm({ currentPassword: '', newPassword: '' })
        } catch (err: unknown) {
            if (err instanceof Error) toast.error(err.message || 'Password update failed')
            else toast.error('Password update failed')
        } finally {
            setSavingPassword(false)
        }
    }

    return (
        <div className="flex items-center justify-center p-4 overflow-hidden">
            {/* Content wrapper with flexible layout */}
            <div className="relative z-10 w-full max-w-7xl h-full">
                {/* Header - stays on top */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">User Management System</h1>
                    <h2 className="text-xl font-semibold text-gray-300 mt-2">My Profile</h2>

                    {/* Role and Status badges */}
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 capitalize">
                            {user.role}
                        </span>
                        <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
                                user.status === 'active'
                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                            {user.status}
                        </span>
                    </div>
                </div>

                {/* Responsive flex container for cards */}
                <div className="flex flex-wrap gap-6 w-full justify-center items-start backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/30 p-6">
                    {/* Profile Information Card - Name & Email */}
                    <div className="flex-1 min-w-75 max-w-125 backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6">
                        {!isEditingProfile ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Name</p>
                                    <p className="text-lg text-white font-medium">{user.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Email</p>
                                    <p className="text-lg text-white font-medium">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsEditingProfile(true)
                                        setProfileForm({ fullName: user.fullName, email: user.email })
                                    }}
                                    className="w-full py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-200">
                                    Edit Profile
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Name</label>
                                    <input
                                        type="text"
                                        value={profileForm.fullName}
                                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Email</label>
                                    <input
                                        type="email"
                                        value={profileForm.email}
                                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    {/* <button
                                        onClick={updateNameEmail}
                                        className="flex-1 py-2 bg-green-500/30 hover:bg-green-500/40 text-white font-medium rounded-lg backdrop-blur-sm border border-green-500/40 transition-all duration-200">
                                        Save
                                    </button> */}
                                    <button
                                        onClick={updateNameEmail}
                                        disabled={savingProfile}
                                        className={`flex-1 py-2 rounded-lg ${
                                            savingProfile ? 'opacity-50 cursor-not-allowed' : 'bg-green-500/30 hover:bg-green-500/40'
                                        }`}>
                                        {savingProfile ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        onClick={() => setIsEditingProfile(false)}
                                        className="flex-1 py-2 bg-red-500/30 hover:bg-red-500/40 text-white font-medium rounded-lg backdrop-blur-sm border border-red-500/40 transition-all duration-200">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Change Password Card */}
                    <div className="flex-1 min-w-75 max-w-125 backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6">
                        <h3 className="text-lg text-white font-semibold mb-4">Change Password</h3>

                        {!isEditingPassword ? (
                            <button
                                onClick={() => setIsEditingPassword(true)}
                                className="w-full py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-200">
                                Update Password
                            </button>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter current password"
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    {/* <button
                                        onClick={updatePassword}
                                        className="flex-1 py-2 bg-green-500/30 hover:bg-green-500/40 text-white font-medium rounded-lg backdrop-blur-sm border border-green-500/40 transition-all duration-200">
                                        Save
                                    </button> */}
                                    <button
                                        onClick={updatePassword}
                                        disabled={savingPassword}
                                        className={`flex-1 py-2 rounded-lg ${
                                            savingPassword ? 'opacity-50 cursor-not-allowed' : 'bg-green-500/30 hover:bg-green-500/40'
                                        }`}>
                                        {savingPassword ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditingPassword(false)
                                            setPasswordForm({ currentPassword: '', newPassword: '' })
                                        }}
                                        className="flex-1 py-2 bg-red-500/30 hover:bg-red-500/40 text-white font-medium rounded-lg backdrop-blur-sm border border-red-500/40 transition-all duration-200">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
