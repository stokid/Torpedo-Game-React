FROM node:18-alpine
RUN npm install npm@latest -g
WORKDIR /frontend/torpedo
COPY package.json package.json
RUN npm install && npm update
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]