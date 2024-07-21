FROM node:20.14.0-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY .env ./


RUN npm install -g pnpm

RUN pnpm install

COPY apps/${APP_NAME} apps/${APP_NAME}
COPY libs libs

RUN cd apps/${APP_NAME} && pnpm install

RUN pnpm run build ${APP_NAME}

FROM node:20.14.0-alpine as production

ARG APP_NAME=default-app-name
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .env ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist
 
ENV TEST=${APP_NAME}

ENV APP_EXEC_FILE=dist/apps/${APP_NAME}/main

 CMD node ${APP_EXEC_FILE}