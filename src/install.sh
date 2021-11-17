npm config set registry https://registry.npm.taobao.org

if [ ! -d "/var/www/qqbot/node_modules" ]; then
  npm install
fi

if [ -f "/var/www/qqbot/config/default.yaml" ]; then
  rm "/var/www/qqbot/config/default.yaml"
fi

cp "/var/www/qqbot/config/default.dev.yaml" "/var/www/qqbot/config/default.yaml"

if [ -f "/var/www/qqbot/config/setting.yaml" ]; then
  rm "/var/www/qqbot/config/setting.yaml"
fi

cp "/var/www/qqbot/config/setting.sample.yaml" "/var/www/qqbot/config/setting.yaml"