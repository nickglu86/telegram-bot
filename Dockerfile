FROM node:18.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .  

EXPOSE 433

CMD ["npm", "start"]