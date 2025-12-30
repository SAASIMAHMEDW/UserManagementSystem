import 'dotenv/config'

/**
 * Retrieves an environment variable by its key.
 * If the variable is not set and 'required' is true, an error is thrown.
 * If the variable is not set and 'required' is false, an empty string is returned.
 * @param {string} key - The key of the environment variable to retrieve.
 * @param {boolean} required - Whether the environment variable is required or not. Defaults to true.
 * @returns {string} The value of the environment variable, or an empty string if not set and not required.
 * @throws {Error} If the environment variable is not set and 'required' is true.
 */
function getEnv(key: string, required = true): string {
    const value = process.env[key]

    if (required && (!value || value.trim() === '')) {
        throw new Error(`Environment variable ${key} is missing`)
    }

    // If not required and unset, return an empty string
    return value as string
}

/**
 * Loads environment variables and returns them as an object.
 * PORT is set to 3000 if not set, MONGO_DB_HOST_URI and FRONTEND_URL are required.
 * @returns {Object} An object containing the environment variables.
 * @throws {Error} If MONGO_DB_HOST_URI or FRONTEND_URL is not set.
 */
export function loadEnv() {
    //const PORT = Number(getEnv('PORT', false)) || 3000
    const PORT = Number(process.env.PORT) || 3000
    const MONGO_DB_HOST_URI = getEnv('MONGO_DB_HOST_URI')
    const FRONTEND_URL = getEnv('FRONTEND_URL')
    const JWT_SECRET = getEnv('JWT_SECRET')
    const JWT_EXPIRES_IN = getEnv('JWT_EXPIRES_IN', false) || '1h'
    return {
        PORT,
        MONGO_DB_HOST_URI,
        FRONTEND_URL,
        JWT_SECRET,
        JWT_EXPIRES_IN
    }
}

export default loadEnv()
