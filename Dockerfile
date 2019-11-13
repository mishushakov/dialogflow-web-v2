FROM node as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build --if-present

FROM pagespeed/nginx-pagespeed
COPY --from=builder /app/dist /usr/share/nginx/html