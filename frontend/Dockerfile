# Stage 1: Build the application
FROM oven/bun:1.2.4 AS builder
WORKDIR /app

COPY package.json bun.lock .env ./

RUN bun install --frozen-lockfile 

COPY . .

RUN bun run build


# Stage 1: Build the application
FROM oven/bun:1.2.4 AS production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/package*.json /app/next.config.ts /app/.env ./


EXPOSE 3000
CMD ["bun", "run", "start"]
