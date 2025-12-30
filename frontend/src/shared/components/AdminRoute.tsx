import { Navigate, Outlet } from 'react-router-dom'
import { useAuthSession } from '@features/auth/hooks/useAuthSession'

export default function AdminRoute() {
    const { loading, user, isAuthenticated } = useAuthSession()

    if (loading) {
        return <div className="p-4">Loading...</div>
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    if (user?.role !== 'admin') {
        return (
            <Navigate
                to="/me"
                replace
            />
        )
    }

    return (
        <div className="w-full bg-black">
            {/* Background blur */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-900 backdrop-blur-3xl" />
            <Outlet />
        </div>
    )
}
