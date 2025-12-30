import { useAuthSession } from '@features/auth/hooks/useAuthSession'
import { Navigate } from 'react-router-dom'

function App() {
    const { loading, isAuthenticated } = useAuthSession()

    if (loading) return <div className="p-4">Loading...</div>

    return isAuthenticated ? (
        <Navigate
            to="/me"
            replace
        />
    ) : (
        <Navigate
            to="/login"
            replace
        />
    )
}

export default App
