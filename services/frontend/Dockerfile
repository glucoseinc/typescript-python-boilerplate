# css/js asset builder
FROM node:alpine

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn

COPY tsconfig.json tslint.json webpack.config.js ./
COPY src/ src/
RUN yarn run build
