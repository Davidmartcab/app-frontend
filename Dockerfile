FROM node:latest as build-step

RUN mkdir -p /app-frontend

WORKDIR /app-frontend

COPY package.json /app-frontend

RUN npm install

COPY . /app-frontend

RUN npm run build

FROM nginx:latest

COPY --from=build-step /app-frontend/dist/app-frontend /usr/share/nginx/html