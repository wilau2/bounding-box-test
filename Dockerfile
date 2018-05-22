FROM node:10.1.0-alpine

COPY package.json package.json
COPY src/ src/

RUN yarn install --production=true

CMD yarn start
