import express, { type Request, type Response, type Express } from 'express'
import config from './config/env.js'
import cors from 'cors'

const app: Express = express()

// Middleware

app.use(express.json())

app.use(
    cors({
        origin: [config.FRONTEND_URL],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
)

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('User Management System API is running')
})

export default app
