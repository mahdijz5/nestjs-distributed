FROM node:lts-alpine As dev
WORKDIR /app
COPY package*.json ./

ARG APP_NAME
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}


RUN npm i -g pnpm
RUN npm i
COPY ./ ./
RUN npm run build ${APP_NAME}

FROM node:lts-alpine as prod
ARG APP_NAME
WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm
RUN npm i
COPY --from=dev /app/dist/ dist
COPY apps/${APP_NAME}/.env .env

ARG APP_PATH=dist/apps/${APP_NAME}/main
CMD ["node", ${APP_PATH}]
 