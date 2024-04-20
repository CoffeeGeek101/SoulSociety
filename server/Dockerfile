FROM node:18-alpine

WORKDIR /user/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN  yarn add argon2  &&  yarn add argon2-browser

RUN yarn build

EXPOSE 4000

CMD node /user/app/dist/index.js
