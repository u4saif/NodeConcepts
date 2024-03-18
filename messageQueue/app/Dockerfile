FROM node:16

WORKDIR /usr/src/app

#install App dependecies
COPY package*.json ./
RUN npm install

#Bundle app source
COPY . .

CMD ["npm","start"]