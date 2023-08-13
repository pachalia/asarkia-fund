FROM node:18.14.1-alpine
WORKDIR /app
COPY /*.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000

