sh install.sh

sed -i '/url/s/url: .*/url: '"$URL"'/g' /var/www/qqbot/config/default.yaml;
sed -i '/wsurl/s/wsurl: .*/wsurl: '"$WSURL"'/g' /var/www/qqbot/config/default.yaml;
sed -i '/qqid/s/qqid: .*/qqid: '"$QQID"'/g' /var/www/qqbot/config/default.yaml;
sed -i '/authKey/s/authKey: .*/authKey: '"$AUTHKEY"'/g' /var/www/qqbot/config/default.yaml;
sed -i '/adminqqid/s/adminqqid: .*/adminqqid: '"$ADMINQQID"'/g' /var/www/qqbot/config/default.yaml;
sed -i '/host/s/host: .*/host: '"$HOST"'/g' /var/www/qqbot/config/default.yaml;
sed -i '/port/s/port: .*/port: '"$PORT"'/g' /var/www/qqbot/config/default.yaml;

npm run start