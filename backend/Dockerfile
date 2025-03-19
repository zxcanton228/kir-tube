FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package*.json bun.lockb dist ./
COPY prisma ./prisma

RUN bun install --frozen-lockfile
RUN bun prisma generate

COPY . .

RUN apk update && \
    apk add --no-cache ffmpeg && \
    rm -rf /var/cache/apk/*

EXPOSE 4200
CMD ["bun", "run", "prod"]
