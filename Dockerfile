FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ins

COPY . .

EXPOSE 3001

CMD ["node", "main.js"]