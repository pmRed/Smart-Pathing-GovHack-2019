FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install
#RUN npm install --only=production

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "run", "build" ]

CMD [ "npm", "run", "start" ]
