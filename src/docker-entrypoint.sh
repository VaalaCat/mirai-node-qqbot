sh install.sh

sed -i '/qqid/s/qqid: .*/qqid: '"$QQID"'/g' /var/www/qqbot/config/default.yaml;
sed -i '/authKey/s/authKey: .*/authKey: '"$AUTHKEY"'/g' /var/www/qqbot/config/default.yaml;
sed -i '/adminqqid/s/adminqqid: .*/adminqqid: '"$ADMINQQID"'/g' /var/www/qqbot/config/default.yaml;
sed -i '/host/s/host: .*/host: '"$HOST"'/g' /var/www/qqbot/config/setting.yml;
sed -i '/port/s/port: .*/port: '"$PORT"'/g' /var/www/qqbot/config/setting.yml;
sed -i '/  adminqq:/s/  adminqq:/  '"$ADMINQQID"':/g' /var/www/qqbot/config/default.yaml;
sed -i 's/verifyKey: .*/verifyKey: '"$VERIFYKEY"'/g' /var/www/qqbot/config/setting.yml;
sed -i '/proxy/s/proxy: .*/proxy: '"$PROXY"'/g' /var/www/qqbot/config/default.yaml;

SETUAPIKEY=$SETUAPIKEY TGTOKEN=$TGTOKEN npm run start