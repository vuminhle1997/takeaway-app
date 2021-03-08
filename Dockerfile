FROM node:12-alpine

RUN mkdir -p /var/src/app
WORKDIR /var/src/app
COPY . .
RUN yarn install
RUN rm -rf client
EXPOSE 80
ENTRYPOINT [ "yarn", "start:react" ]