# ---------- Build stage ----------
FROM node:22-alpine AS builder

# Enable pnpm
RUN corepack enable

WORKDIR /app

# Copy dependency files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy environment variables
COPY .env.production .env.production

# Copy source code
COPY . .

# Build app
RUN pnpm build


# ---------- Runtime stage ----------
FROM nginx:1.27-alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx configs
COPY nginx.main.conf /etc/nginx/nginx.conf
COPY nginx.site.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /tmp

# Switch to non-root user
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
