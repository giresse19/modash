FROM node:10

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY ./src /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]