# Use official Node.js LTS as the base image
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# =========================
# Production Image
# =========================
FROM node:20-alpine AS runner

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json

RUN npm install --omit=dev

EXPOSE 3000

# Important: bind to 0.0.0.0 so it's accessible
CMD ["npm", "run", "start", "--", "-p", "3000", "--hostname", "0.0.0.0"]
