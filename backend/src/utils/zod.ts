import { ZodError } from 'zod/v3'

export function formatZodError(error: ZodError) {
    // return error.issues.map(issue => issue.message);
    return error.issues.map((issue) => issue.message).join(', ')
}
