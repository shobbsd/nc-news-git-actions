FROM node:latest

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG PORT=9090
ENV PORT=${PORT}

COPY package*.json ./

RUN npm install --production

COPY . . 

EXPOSE 9090

CMD [ "npm", "start" ]

