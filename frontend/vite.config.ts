import { defineConfig, loadEnv, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

type TMode = 'development' | 'production'

interface AppEnv {
    PORT: string
    BACKEND_PROXY: string
    VITE_ENV: TMode
}

const validateEnv = (envMode: TMode, env: Partial<AppEnv>) => {
    const commonVars: (keyof AppEnv)[] = ['VITE_ENV']
    const devOnlyVars: (keyof AppEnv)[] = ['PORT', 'BACKEND_PROXY']

    const requiredVars = envMode === 'development' ? [...commonVars, ...devOnlyVars] : commonVars

    for (const key of requiredVars) {
        if (!env[key]) {
            throw new Error(`${key} is missing! Please define it in your .env.${envMode}`)
        }
    }
}

const normalizePort = (port: string) => {
    const normalizedPort = parseInt(port)
    if (isNaN(normalizedPort)) {
        throw new Error(`Invalid port value: ${port}`)
    }
    return normalizedPort
}

export default defineConfig(({ mode }) => {
    const envMode = mode as TMode
    const env = loadEnv(envMode, process.cwd(), '') as unknown as Partial<AppEnv>

    validateEnv(envMode, env)

    const server: ServerOptions | undefined =
        envMode === 'development'
            ? {
                  port: normalizePort(env.PORT!),
                  open: true,
                  proxy: {
                      '/api': {
                          target: env.BACKEND_PROXY!,
                          changeOrigin: true,
                          rewrite: (path) => path.replace(/^\/api/, '')
                      }
                  }
              }
            : undefined

    return {
        plugins: [react(), tailwindcss()],
        server,
        preview: server,
        build: {
            minify: true
        },
        resolve: {
            alias: {
                '@features': path.resolve(__dirname, 'src/features'),
                '@shared': path.resolve(__dirname, 'src/shared')
            }
        }
    }
})
