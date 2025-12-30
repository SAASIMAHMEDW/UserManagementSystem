import { useState } from 'react'
import { signupSchema } from '../schemas/auth.schema'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
    const navigate = useNavigate()
    const { signup, loading } = useAuth()

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const parsed = signupSchema.safeParse(form)
        if (!parsed.success) {
            parsed.error.issues.forEach((i) => {
                toast.error(i.message)
            })
            return
        }

        await signup(parsed.data)
        setForm({
            fullName: '',
            email: '',
            password: ''
        })
        toast.success('Signup successful')
        navigate('/login', { replace: true })
    }

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
            {/* Blurred backdrop overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-900 backdrop-blur-3xl" />

            {/* Glassmorphism form container */}
            <div className="relative z-10 w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
                    {/* Heading */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-white">User Management System</h1>
                        <h2 className="text-xl font-semibold text-gray-300">Signup</h2>
                    </div>

                    {/* Input fields */}
                    <input
                        placeholder="Full name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all"
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />

                    <input
                        placeholder="Email"
                        type="email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    {/* Submit button */}
                    <button
                        disabled={loading}
                        className="w-full py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-200 disabled:cursor-not-allowed">
                        {loading ? 'Loading...' : 'Signup'}
                    </button>
                </form>
                <div className="text-center mt-4 text-gray-400">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-white underline hover:text-gray-200">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
