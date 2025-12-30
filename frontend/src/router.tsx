import { createBrowserRouter } from 'react-router-dom'
import Signup from '@features/auth/pages/SignupPage'
import Login from '@features/auth/pages/LoginPage'
import Me from '@features/users/pages/Me'
import ProtectedRoute from '@shared/components/ProtectedRoutes'
import FeaturePage from '@shared/layouts/FeaturePage'
import App from './App'
import Users from '@features/users/pages/Users'
import AdminRoute from '@shared/components/AdminRoute'

export const router = createBrowserRouter([
    // Public
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },

    // Authenticated layout
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <FeaturePage />,
                children: [
                    { path: '/me', element: <Me /> },

                    // Admin-only routes
                    {
                        element: <AdminRoute />,
                        children: [{ path: '/users', element: <Users /> }]
                    }
                ]
            }
        ]
    }
])
