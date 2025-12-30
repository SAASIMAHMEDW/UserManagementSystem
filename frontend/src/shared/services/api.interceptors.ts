import { api } from './api'

// global error handling
api.interceptors.response.use(
    (res) => res,
    (error) => {
        return Promise.reject(error)
    }
)
