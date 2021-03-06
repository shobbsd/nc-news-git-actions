FROM node:latest

ARG NODE_ENV=development
ARG PORT=9090

COPY package*.json ./

RUN npm install --production

COPY . . 

EXPOSE 9090

CMD [ "npm", "start" ]

