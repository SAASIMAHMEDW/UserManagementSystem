import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <RouterProvider router={router} />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            pauseOnHover
        />
    </>
)
