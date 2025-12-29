import app from './app.js'
import { loadEnv } from './config/env.js'
import { connectDB } from './config/db.js'

async function startServer() {
    try {
        const env = loadEnv()

        await connectDB()

        app.listen(env.PORT, () => {
            console.log(`Server started on port ${env.PORT}`)
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startServer()
