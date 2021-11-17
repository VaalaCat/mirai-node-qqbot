FROM node:17

RUN apt update && apt install python python3 sqlite3 -y
RUN npm config set registry https://registry.npm.taobao.org

WORKDIR /var/www/qqbot
COPY ./src /var/www/qqbot

RUN npm install

ENTRYPOINT [ "/var/www/qqbot/docker-entrypoint.sh" ]