import { Navbar } from '@shared/components'
import { Outlet } from 'react-router-dom'

function FeaturePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default FeaturePage
