FROM node:8-alpine

WORKDIR /

COPY package.json package.json
RUN npm install

COPY dist dist

ENTRYPOINT npm run start