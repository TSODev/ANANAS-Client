#FROM node:10-slim as build-stage
FROM tiangolo/node-frontend:10 as build-stage
LABEL build=stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/tsodev* /etc/nginx/keys.d/
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]