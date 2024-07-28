FROM node:lts-alpine As dev
WORKDIR /app
 
COPY . . 

RUN npm install -g pnpm
RUN npm install 


CMD ["npm", "test"]