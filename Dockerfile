FROM node:16-slim as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm run build

FROM node:16-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

ENTRYPOINT ["node", "src/server.js"]
