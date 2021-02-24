const ban = require("./ban");
const access_control = require("../access_control");

async function func_strict(mirai, sender, msg, query) {
    return new Promise(async (resolve, reject) => {
        if (query[1] == "qq" && await ban.is_qq(query[2]) && await ban.is_func(query[3]) && query[4] === 'allow') {
            let data = await access_control.get_user(query[2]);
            let menu = await ban.all_func();
            menu = menu.join(",");
            let allow = query[3];
            //检测之前有无允许同名命令
            if (query[3] != "all" && data != 0) {
                let oldallow = data.allow.split(",");
                if (oldallow.indexOf(allow) != -1) {
                    msg.reply("之前就允许他了哦", true);
                    resolve(0)
                    return;
                }
            }
            if (data != 0) {
                data.allow = data.allow + "," + allow;
                await access_control.update_user(data);
                msg.reply("这就允许他");
                resolve(0);
                return;
            }
            else {
                data = {
                    "id": query[2],
                    "base": "0",
                    "allow": allow,
                    "ban": ""
                };
                await access_control.update_user(data);
                msg.reply("这就允许他");
                resolve(0);
                return;
            }
        }
        else if (query[1] == "group" && (await ban.is_qq(query[2]) || query[2] == "here") && await ban.is_func(query[3]) && query[4] === 'allow') {
            let groupid = sender.indexOf(":") != -1 ? sender.split(":")[0] : query[2];
            let menu = await ban.all_func();
            menu = menu.join(",");
            let allow = query[3];
            let data = await access_control.get_group(groupid);

            if (query[3] != "all" && data != 0) {
                let oldallow = data.allow.split(",");
                if (oldallow.indexOf(allow) != -1) {
                    msg.reply("之前就允许他了哦", true);
                    resolve(0);
                    return;
                }
            }
            if (data != 0) {
                data.allow = data.allow + "," + allow;
                await access_control.update_group(data);
                msg.reply("这就允许他");
                resolve(0);
                return;
            }
            else {
                data = {
                    "id": groupid,
                    "base": "0",
                    "allow": allow,
                    "ban": ""
                };
                await access_control.update_group(data);
                msg.reply("这就允许他");
                resolve(0);
                return;
            }
        }
        else if (query[1] == "qq" && await ban.is_qq(query[2]) && (await ban.is_func(query[3]) || query[3] == "all") && query[4] === 'deny') {
            let data = await access_control.get_user(query[2]);
            let oldallow = data.allow.split(",");
            let cur = oldallow.indexOf(query[3]);

            if (cur != -1) {
                oldallow.splice(cur, 1);
                data.allow = oldallow;
                data.allow = data.allow.join(",");
                access_control.update_user(data);
                msg.reply("这就ban掉他");
                resolve(0);
            }
            else if (query[3] == "all") {
                data.allow = "";
                access_control.update_user(data);
                msg.reply("这就ban掉他");
                resolve(0);
            }
            else {
                msg.reply("数据库中没有该条数据");
                resolve(0);
            }
        }
        else if (query[1] == "group" && (await ban.is_qq(query[2]) || query[2] == "here") && (await ban.is_func(query[3]) || query[3] == "all") && query[4] === 'deny') {
            let groupid = sender.indexOf(":") != -1 ? sender.split(":")[0] : query[2];
            let data = await access_control.get_group(groupid);
            let oldallow = data.allow.split(",");
            let cur = oldallow.indexOf(query[3]);

            if (cur != -1) {
                oldallow.splice(cur, 1);
                data.allow = oldallow;
                data.allow = data.allow.join(",");
                access_control.update_group(data);
                msg.reply("这就ban掉他");
                resolve(0);
            }
            else if (query[3] == "all") {
                data.allow = "";
                access_control.update_group(data);
                msg.reply("这就ban掉他");
                resolve(0);
            }
            else {
                msg.reply("数据库中没有该条数据");
                resolve(0);
            }
        }
        else {
            msg.reply("格式错误");
            resolve(1);
            return;
        }
    })
}

module.exports = {
    func_strict
}