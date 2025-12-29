import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            // unique: true,
            lowercase: true
            // index: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },

        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },

        lastLogin: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
)

userSchema.index({ email: 1 }, { unique: true })

export default mongoose.model('User', userSchema)
