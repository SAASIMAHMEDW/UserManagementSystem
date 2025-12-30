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

    return <Outlet />
}
