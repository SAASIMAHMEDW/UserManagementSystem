import { api } from '@shared/services/api'

export const authApi = {
    me: () =>
        api.get('/users/me', {
            withCredentials: true
        }),

    updateProfile: (payload: { fullName: string; email: string }) =>
        api.put('/users/me', payload, {
            withCredentials: true
        }),

    changePassword: (payload: { currentPassword: string; newPassword: string }) =>
        api.put('/users/me/password', payload, {
            withCredentials: true
        }),

    logout: () => api.post('/auth/logout', {}, { withCredentials: true })
}
