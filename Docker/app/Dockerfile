FROM alpine:3.12.1
LABEL Emiliano Nunez <nunez.emiliano@gmail.com>
RUN apk update && apk add nodejs npm && rm -rf /var/cache/apk/*
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY package.json ./
RUN npm install