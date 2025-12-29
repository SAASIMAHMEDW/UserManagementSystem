import type { Request, Response } from 'express'
import { signupSchema, loginSchema } from './auth.schema.js'
import { signupUser, loginUser } from './auth.service.js'
import { sendSuccess } from '../../utils/response.js'
import { ZodError } from 'zod/v3'
import { formatZodError } from '../../utils/zod.js'

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = signupSchema.parse(req.body)

        const { user, token } = await signupUser(fullName, email, password)

        return sendSuccess(
            res,
            'Signup successful',
            {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                token
            },
            201
        )
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: formatZodError(err)
            })
        }
        throw err
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body)

    const { user, token } = await loginUser(email, password)

    return sendSuccess(res, 'Login successful', {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token
    })
}
