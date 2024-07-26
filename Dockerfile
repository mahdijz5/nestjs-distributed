FROM node:latest As dev
WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm i
COPY ./ ./
RUN npm run build reservation

FROM node:lts-alpine as prod
WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm i
COPY --from=dev /app/dist/ dist
COPY apps/reservation/.env.prod ./apps/reservation/.env
CMD ["node", "dist/apps/reservation/apps/reservation/src/main"]
