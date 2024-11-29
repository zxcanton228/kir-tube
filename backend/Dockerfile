FROM oven/bun:latest AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY bun.lockb ./
COPY dist ./

RUN bun install
RUN bun prisma generate

COPY . .

# RUN bun run build

FROM oven/bun:latest
# FROM node:latest

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/bun.lockb ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/emails ./emails
COPY --from=builder /app/tsconfig*.json ./

EXPOSE 4200
CMD ["bun", "run", "prod"]