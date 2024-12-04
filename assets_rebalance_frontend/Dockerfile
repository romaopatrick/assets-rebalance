FROM node:latest

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN export NODE_ENV=production  

RUN yarn build

CMD ["yarn", "start"]