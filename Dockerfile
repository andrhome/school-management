# stage 1
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm audit fix
RUN npm update
RUN npm run build-prod

# stage 2
FROM nginx:alpine
COPY --from=build /dist/school-management/ /usr/share/nginx/html/
