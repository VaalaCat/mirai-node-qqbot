const EventEmitter = require('events');
const request = require("request");
const jsdom = require("jsdom");
const config = require("config");
var sqlite3 = require("sqlite3");

const access_control = require("./access_control");
const { resolve } = require('path');

const eventEmitter = new EventEmitter();

var plugins = require("require-all")({
    dirname: __dirname + "/plugins",
    recursive: false
})

var format = config.get("func");
var menu = Object.keys(format);

async function register_plugins() {
    return new Promise(async (resolve, reject) => {
        for (i in menu) {
            eventEmitter.on(menu[i], async (mirai, sender, msg, query) => {
                try {
                    await plugins[query[0]]["func_" + query[0]](mirai, sender, msg, query);
                }
                catch (error) {
                    console.log(menu[i], "error:", error);
                }
            });
        }
        resolve(0);
    });
}

function message_to_string(messageChain) {
    let ans = "";
    for (i in messageChain) {
        if (messageChain[i].type == "Plain") {
            ans += messageChain[i].text;
        }
    }
    return ans;
}

async function selector(mirai, msg) {
    return new Promise(async function (resolve, reject) {
        //暂时不处理图片
        let sender = (msg.type == "FriendMessage") ? msg.sender.id + "" : (String(msg.sender.group.id) + ":" + String(msg.sender.id));
        let query = message_to_string(msg.messageChain);
        let mode = msg.type;
        let keywords = await access_control.get_keyword(query);

        if (query.indexOf("#") == 0) {
            for (let i in menu) {
                //在menu中找到了相应的方法
                if (query.indexOf(menu[i]) == 1 && (query.indexOf(" ") == menu[i].length + 1 || query.length == menu[i].length + 1)) {
                    //去掉sharp号
                    query = query.substring(1);
                    //依照空格分隔请求，计算数组长度校验format调用格式
                    query = query.split(" ");
                    //删除空的元素
                    for (let i in query) {
                        if (query[i] == "") {
                            query.splice(i, 1);
                        }
                    }
                    //权限正确
                    let flag = await access_control.filter(sender, mode, query);
                    if (flag) {
                        if (query.length == format[menu[i]].query) {
                            //这里传进去的msg不是字符串哦，query是以第一个元素为命令，后面都是参数的数据组成的数组，qqid指的是bot的qq
                            eventEmitter.emit(menu[i], mirai, sender, msg, query);
                            resolve(0);
                        }
                        else {
                            msg.reply("格式错误");
                            resolve(0);
                        }
                    }
                }
            }
        }
        //这里添加关键词监听

    })
}

module.exports = {
    selector,
    register_plugins
}