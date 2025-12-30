import { Link, useNavigate } from 'react-router-dom'
import { useAuthSession } from '@features/auth/hooks/useAuthSession'

import { useAuth } from '@features/auth/hooks/useAuth'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const { user, refresh } = useAuthSession()
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()

        refresh()
        navigate('/login')
    }

    return (
        <nav className="w-screen h-20 justify-center sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
                        User Management System
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        {user && user?.role === 'admin' && (
                            <NavLink
                                to="/users"
                                className="text-white hover:text-gray-300 hover:border-b transition-colors font-medium">
                                Users
                            </NavLink>
                        )}

                        {user && (
                            <>
                                <NavLink
                                    to="/me"
                                    className="text-white hover:text-gray-300 hover:border-b transition-colors font-medium">
                                    My Profile
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600/20 hover:bg-red-500/30 text-white font-medium rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-200">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
