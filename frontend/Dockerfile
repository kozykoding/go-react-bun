# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package.json bun.lock ./

# Install dependencies (cached unless package files change)
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build args for Vite env variables
ARG VITE_API_URL
ARG VITE_ASTEROIDS_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ASTEROIDS_URL=$VITE_ASTEROIDS_URL

# Build the app
RUN bun run build

# Production stage - tiny nginx image
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

