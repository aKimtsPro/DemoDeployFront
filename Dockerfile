FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run deploy_prod:build

FROM nginx:latest AS prod
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/demo-deploy-front/browser /usr/share/nginx/html
EXPOSE 80
