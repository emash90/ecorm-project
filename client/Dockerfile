FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json .

RUN npm install -g npm@10.3.0

COPY . .

COPY .env .