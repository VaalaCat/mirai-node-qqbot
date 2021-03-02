# Mirai-node-qqbot

> 该项目使用了 `mirai-ts` 和 `mirai-api-http` 构建了一个简易的 qq 机器人

使用 `#pa` 的结构调用插件，插件名要使用井号开头

**QwQ setu模块慎用!!!!!!!，已经被封号一天了 www**

## 项目结构说明

- `src/access_control.js`

    该文件为权限控制模块，用以决定用户是否拥有调用某插件的权限，第一次运行后会将配置文件中的数据写入数据库持久动态记忆，优先调用数据库数据

- `src/events_router.js`

    该文件为事件路由，监听消息中是否调用插件，并调用权限控制模块，校验合格后异步调用插件，插件详细信息储存在配置文件中，第一次运行后会写入数据库，优先调用数据库数据

- `src/main.js`

    程序入口，用于启动程序

- `src/config`

    配置文件文件夹，基本配置文件格式在文件中有详细注释

- `src/plugins`

    插件文件夹，调用格式参考已有插件

- `src/data`

    数据库文件夹

## 使用说明

1. `git clone https://github.com/VaalaCat/mirai-node-qqbot.git` 克隆本仓库

2. 修改 `docker-compose.yml` 中 `environment` 中的各项内容

3. 执行 `docker-compose up -d` 运行程序

4. 可以使用 `docker logs qqbot_node_1` 查看运行状态