FROM mhart/alpine-node:14

RUN mkdir /code
WORKDIR /code
ADD . /code/
# INSTALL NODE MODULES
RUN rm -rf node_modules/
RUN npm install
# INSTALL MONGO SERVER
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb yaml-cpp=0.6.2-r2
RUN mongo -version
# RUN MONGO ATTACHED TO SYSLOGS
RUN mkdir -p /data/db
RUN apk add openrc --no-cache
RUN rc-update add mongodb
RUN mongod --fork --syslog

EXPOSE 3000

CMD ["/bin/sh", "/code/run.sh"]

