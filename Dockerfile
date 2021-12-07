FROM node:16

RUN apt update && apt install python python3 sqlite3 -y

WORKDIR /var/www/qqbot
COPY ./src /var/www/qqbot

RUN npm --registry https://registry.npm.taobao.org install

ENTRYPOINT [ "/var/www/qqbot/docker-entrypoint.sh" ]
