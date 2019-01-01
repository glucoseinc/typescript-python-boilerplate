# css/js asset
FROM typescript-python-boilerplate-frontend:latest as frontend

# nginx container
FROM nginx:mainline-alpine
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

EXPOSE 80

COPY --from=frontend /build/static ./static
COPY services/nginx/nginx.conf /etc/nginx/nginx.conf

