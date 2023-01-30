FROM node:18-alpine
WORKDIR /frontend/torpedo
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]