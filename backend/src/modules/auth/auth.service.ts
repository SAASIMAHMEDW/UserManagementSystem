import User from '../../models/user.model.js'
import { hashPassword, comparePassword } from '../../utils/password.js'
import { signToken } from '../../utils/jwt.js'

export const signupUser = async (fullName: string, email: string, password: string) => {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new Error('Email already registered')
    }

    const hashedPassword = await hashPassword(password)

    // First user becomes admin
    const isFirstUser = (await User.countDocuments()) === 0

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role: isFirstUser ? 'admin' : 'user'
    })

    const token = signToken({
        userId: user.id,
        email,
        role: user.role
    })

    return { user, token }
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        throw new Error('Invalid email or password')
    }

    if (user.status !== 'active') {
        throw new Error('Account is inactive')
    }

    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid email or password')
    }

    user.lastLogin = new Date()
    await user.save()

    const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role
    })

    return { user, token }
}
