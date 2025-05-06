# Build env
FROM node:23-alpine AS builder
LABEL authors="Hubert Jędruchniewicz"

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY public ./public
COPY server.js ./

# Runtime env
FROM node:23-alpine
LABEL authors="Hubert Jędruchniewicz"

WORKDIR /app
COPY --from=builder /app .

ENV NODE_ENV=production
ENV PORT=3000


HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q -O /dev/null http://localhost:${PORT}/ || exit 1


EXPOSE ${PORT}
CMD ["node", "server.js"]