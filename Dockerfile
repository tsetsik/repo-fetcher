FROM node:alpine
ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

RUN npm install nodemon
RUN npm install