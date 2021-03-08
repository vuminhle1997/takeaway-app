FROM node:12-alpine

RUN mkdir -p /var/src/app
WORKDIR /var/src/app
COPY . .
RUN yarn install
WORKDIR /var/src/app/client
RUN yarn install
RUN yarn build
RUN mv ./build ../
WORKDIR /var/src/app
RUN rm -rf client
EXPOSE 80
ENTRYPOINT [ "yarn", "start" ]