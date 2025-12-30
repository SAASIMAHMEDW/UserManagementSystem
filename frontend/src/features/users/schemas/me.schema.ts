import { z } from 'zod'

export const updateProfileSchema = z.object({
    fullName: z.string().min(2, 'Name too short'),
    email: z.string().email('Invalid email')
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, 'Invalid password'),
    newPassword: z.string().min(8, 'Minimum 8 characters')
})
export type UpdateProfileForm = z.infer<typeof updateProfileSchema>
export type ChangePasswordForm = z.infer<typeof changePasswordSchema>
