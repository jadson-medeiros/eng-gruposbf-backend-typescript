FROM node:current-alpine as build
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .

FROM node:current-alpine as prod
WORKDIR /src
COPY --from=build /src ./
EXPOSE 3333
CMD node server.js