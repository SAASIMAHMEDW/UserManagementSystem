import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { fetchUsers, activateUser, deactivateUser, type UserDTO } from '../services/users.api'

function Users() {
    const [users, setUsers] = useState<UserDTO[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [actionId, setActionId] = useState<string | null>(null)

    const loadUsers = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetchUsers({ page, limit: 10, search })
            setUsers(res.users)
            setTotalPages(res.totalPages)
        } catch {
            toast.error('Failed to load users')
        } finally {
            setLoading(false)
        }
    }, [page, search])

    useEffect(() => {
        loadUsers()
    }, [page, search, loadUsers])

    const activeAdminCount = users.filter((u) => u.role === 'admin' && u.status === 'active').length

    const toggleStatus = async (user: UserDTO) => {
        try {
            setActionId(user._id)

            if (user.status === 'active') {
                if (user.role === 'admin' && activeAdminCount <= 1) {
                    toast.error('At least one admin must remain active')
                    return
                }
                await deactivateUser(user._id)
                toast.success('User deactivated')
            } else {
                await activateUser(user._id)
                toast.success('User activated')
            }

            loadUsers()
        } catch (err: unknown) {
            if (err instanceof Error) toast.error(err.message)
            else toast.error('Action failed')
        } finally {
            setActionId(null)
        }
    }

    return (
        <div className="flex justify-center p-6">
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">User Management System</h1>
                    <h2 className="text-xl text-gray-300 mt-2">Admin · Users</h2>
                </div>

                {/* Search */}
                <div className="mb-4 flex justify-between">
                    <input
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => {
                            setPage(1)
                            setSearch(e.target.value)
                        }}
                        className="w-72 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
                    />
                </div>
                {/* Table Card */}
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 overflow-x-auto w-full">
                    <table className="w-full text-left text-gray-300">
                        <thead className="text-xs uppercase text-gray-400 border-b border-white/20">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u) => (
                                <tr
                                    key={u._id}
                                    className="border-b border-white/10 hover:bg-white/5 hover:border hover:rounded transition">
                                    <td className="px-4 py-3 text-white font-medium">{u.fullName}</td>
                                    <td className="px-4 py-3">{u.email}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs capitalize border ${
                                                u.role === 'admin'
                                                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                                    : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs border ${
                                                u.status === 'active'
                                                    ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                                            }`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            disabled={actionId === u._id}
                                            onClick={() => toggleStatus(u)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-medium backdrop-blur-sm border transition ${
                                                u.status === 'active'
                                                    ? 'bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-red-300'
                                                    : 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30 text-green-300'
                                            }`}>
                                            {u.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:bg-white/5 disabled:text-gray-600 text-white font-medium rounded-lg backdrop-blur-sm border border-white/30 disabled:border-white/10 transition-all duration-200 disabled:cursor-not-allowed min-w-20">
                            Prev
                        </button>

                        <span className="px-4 py-2 bg-white/10 text-white font-medium rounded-lg backdrop-blur-sm border border-white/20 min-w-30 text-center">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:bg-white/5 disabled:text-gray-600 text-white font-medium rounded-lg backdrop-blur-sm border border-white/30 disabled:border-white/10 transition-all duration-200 disabled:cursor-not-allowed min-w-20">
                            Next
                        </button>
                    </div>

                    {loading && <p className="text-center text-gray-400 mt-4">Loading...</p>}
                    {users && users.length === 0 && <div className="text-center text-gray-400 py-6">No users found</div>}
                </div>
            </div>
        </div>
    )
}

export default Users
