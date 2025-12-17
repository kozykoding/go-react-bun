FROM golang:1.25.5-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main cmd/api/main.go

FROM alpine:3.20.1 AS prod
WORKDIR /app
COPY --from=build /app/main /app/main
EXPOSE ${PORT}
CMD ["./main"]


# --- Frontend build using Bun ---
FROM oven/bun:1 AS frontend_builder
WORKDIR /frontend

# Install frontend dependencies with Bun
COPY frontend/package*.json ./
COPY frontend/bun.lock ./bun.lock
RUN bun install

# Copy the rest of the frontend source and build with Vite
COPY frontend/. .
RUN bunx --bun vite build


# --- Frontend static file server using Bun + serve ---
FROM oven/bun:1 AS frontend
WORKDIR /app

# Install the "serve" static file server via Bun
RUN bun install -g serve

# Copy built assets from the builder stage
COPY --from=frontend_builder /frontend/dist /app/dist

EXPOSE 5173
CMD ["serve", "-s", "/app/dist", "-l", "5173"]
