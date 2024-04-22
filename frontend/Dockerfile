FROM node:20.12-slim

SHELL ["/bin/sh", "-c"]

RUN mkdir -p /usr/src/TasteMaker/frontend/node_modules && chown -R node:node /usr/src/TasteMaker/frontend

WORKDIR /usr/src/TasteMaker/frontend/

COPY package*.json .

RUN apt update && apt install netcat-openbsd -y

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]