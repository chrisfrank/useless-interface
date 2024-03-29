FROM node:16-slim as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=builder /usr/src/app/build build/
RUN npm ci --only=production
COPY . .

ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

ENTRYPOINT ["node", "src/server.js"]
