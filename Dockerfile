FROM node:12-alpine3.14

RUN mkdir -p /actions
WORKDIR /actions
ENTRYPOINT npm install && tail -f /dev/null
