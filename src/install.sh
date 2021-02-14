npm config set registry https://registry.npm.taobao.org

if [ ! -d "/var/www/qqbot/node_modules" ]; then
  npm install
fi