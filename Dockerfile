FROM node:13-alpine AS build

WORKDIR /test
COPY . .
RUN npm install --no-optional
RUN npm audit
RUN npm run lint
CMD [ "npm","run","test" ]