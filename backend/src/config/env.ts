import 'dotenv/config'

const PORT = Number(process.env.PORT) || 3000
const MONGO_DB_HOST_URI = String(process.env.MONGO_DB_HOST_URI) || undefined
const FRONTEND_URL = String(process.env.FRONTEND_URL) || undefined

if (!MONGO_DB_HOST_URI) {
    throw new Error("MONGO_DB_HOST_URI is not defined in environment variables");
}
if (!FRONTEND_URL) {
    throw new Error("FRONTEND_URL is not defined in environment variables");
}

export default {
    PORT,
    MONGO_DB_HOST_URI,
    FRONTEND_URL
}
