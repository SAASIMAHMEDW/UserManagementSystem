import { useAuthSession } from '@features/auth/hooks/useAuthSession'

export default function Me() {
    const { user } = useAuthSession()

    if (!user) return null

    return (
        <div className="w-full bg-black flex items-center justify-center p-4">
            {/* Blurred backdrop overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-900 backdrop-blur-3xl" />

            {/* Glassmorphism profile card */}
            <div className="relative z-10 w-full max-w-lg">
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2 pb-6 border-b border-white/20">
                        <h1 className="text-3xl font-bold text-white">User Management System</h1>
                        <h2 className="text-xl font-semibold text-gray-300">My Profile</h2>
                    </div>

                    {/* Profile Information */}
                    <div className="space-y-4">
                        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-1">Name</p>
                            <p className="text-lg text-white font-medium">{user.fullName}</p>
                        </div>

                        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-1">Email</p>
                            <p className="text-lg text-white font-medium">{user.email}</p>
                        </div>

                        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-1">Role</p>
                            <p className="text-lg text-white font-medium capitalize">{user.role}</p>
                        </div>

                        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-1">Status</p>
                            <p className="text-lg text-white font-medium">
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                                        user.status === 'active'
                                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                    }`}>
                                    {user.status}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
