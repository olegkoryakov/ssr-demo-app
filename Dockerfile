FROM node:14.17.6-alpine

WORKDIR /app

COPY ./app /app

RUN npm install

CMD npm run build && node ./server/index.js