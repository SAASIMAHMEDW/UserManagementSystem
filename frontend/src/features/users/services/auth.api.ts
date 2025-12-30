import axios from 'axios'

export const authApi = {
    me: () =>
        axios.get('/api/users/me', {
            withCredentials: true
        }),

    updateProfile: (payload: { fullName: string; email: string }) =>
        axios.put('/api/users/me', payload, {
            withCredentials: true
        }),

    changePassword: (payload: { currentPassword: string; newPassword: string }) =>
        axios.put('/api/users/me/password', payload, {
            withCredentials: true
        }),

    logout: () => axios.post('/api/auth/logout', {}, { withCredentials: true })
}
