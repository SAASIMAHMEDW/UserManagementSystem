import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { loadEnv } from '../config/env.js'

const { JWT_SECRET, JWT_EXPIRES_IN } = loadEnv()

interface JwtPayload {
    userId: string
    email?: string
    role: 'admin' | 'user'
}

const jwtSecret: Secret = JWT_SECRET

const signOptions: SignOptions = {
    expiresIn: JWT_EXPIRES_IN
}

export const signToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, jwtSecret, signOptions)
}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, jwtSecret) as JwtPayload
}
