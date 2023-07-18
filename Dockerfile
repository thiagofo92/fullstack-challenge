FROM node:18.13.0

WORKDIR /var 

RUN mkdir -p /api

COPY ./dist ./api
COPY ./package.json ./api
# COPY ./pm2-config.json ./api

WORKDIR /var/api

RUN npm install
# RUN npm install pm2 -g
CMD node main.js
# CMD ["pm2-runtime", "pm2-config.json"]
