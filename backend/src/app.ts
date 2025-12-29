import express, { type Request, type Response, type Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'


import { loadEnv } from './config/env.js'
import routes from './routes.js'
import { errorHandler } from './middlewares/error.middleware.js'

const env = loadEnv()
const app: Express = express()

// Core middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true
    })
)

// Routes
app.use('/api', routes)

// Health & root
app.get('/', (_req: Request, res: Response) => {
    res.send('User Management System API is running')
})

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('OK')
})

// Global error handler
app.use(errorHandler)

export default app
