FROM node:alpine
WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

CMD ["npm", "run", "start"]