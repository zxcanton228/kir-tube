FROM oven/bun:latest AS builder

WORKDIR /app

COPY package*.json bun.lockb dist ./
COPY prisma ./prisma

RUN bun install --frozen-lockfile
RUN bun prisma generate

COPY . .

FROM oven/bun:latest

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/bun.lockb ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/emails ./emails
COPY --from=builder /app/tsconfig*.json ./ 

RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*


EXPOSE 4200
CMD ["bun", "run", "prod"]