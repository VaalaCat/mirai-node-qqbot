if [ -f "/var/www/qqbot/config/default.yaml" ]; then
  rm "/var/www/qqbot/config/default.yaml"
fi

cp "/var/www/qqbot/config/default.dev.yaml" "/var/www/qqbot/config/default.yaml"

if [ -f "/var/www/qqbot/config/setting.yml" ]; then
  rm "/var/www/qqbot/config/setting.yml"
fi

cp "/var/www/qqbot/config/setting.sample.yml" "/var/www/qqbot/config/setting.yml"