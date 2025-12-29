import { connect } from 'mongoose'

import config from './env.js'

export const connectDB = async () => {
    try {
        if (!config.MONGO_DB_HOST_URI) {
            throw new Error('MONGO_DB_HOST_URI is not defined in environment variables')
        }

        await connect(config.MONGO_DB_HOST_URI)
        console.log('Database connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
