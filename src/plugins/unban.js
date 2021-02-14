const access_control = require("../access_control");

async function func_unban(mirai, sender, msg, query) {
    return new Promise(async (resolve, reject) => {
        if (query[1] == "qq" && is_qq(query[2]) && (is_func(query[3]) || query[3] == "all")) {
            let data = await access_control.get_user(query[2]);
            let oldban = data.ban.split(",");
            let cur = oldban.indexOf(query[3]);

            if (cur != -1) {
                oldban.splice(cur, 1);
                data.ban = oldban;
                data.ban = data.ban.join(",");
                access_control.update_user(data);
                msg.reply("芜湖起飞");
                resolve(0);
            }
            else if (query[3] == "all") {
                data.ban = "";
                access_control.update_user(data);
                msg.reply("芜湖起飞");
                resolve(0);
            }
            else {
                msg.reply("数据库中没有该条数据");
                resolve(0);
            }
        }
        else if (query[1] == "group" && (is_qq(query[2]) || query[2] == "here") && (is_func(query[3]) || query[3] == "all")) {
            let groupid = sender.indexOf(":") != -1 ? sender.split(":")[0] : query[2];
            let data = await access_control.get_group(groupid);
            let oldban = data.ban.split(",");
            let cur = oldban.indexOf(query[3]);

            if (cur != -1) {
                oldban.splice(cur, 1);
                data.ban = oldban;
                data.ban = data.ban.join(",");
                access_control.update_group(data);
                msg.reply("芜湖起飞");
                resolve(0);
            }
            else if (query[3] == "all") {
                data.ban = "";
                access_control.update_group(data);
                msg.reply("芜湖起飞");
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
        }
    })
}

async function is_qq(qqid) {
    return new Promise(async (resolve, reject) => {
        if (parseInt(qqid) == qqid) {
            resolve(true);
        }
        else {
            resolve(false);
        }
    });
}

async function is_func(funcname) {
    return new Promise(async (resolve, reject) => {
        let funcs = await access_control.get_all("funcs");
        let flag = false;
        for (i in funcs) {
            if (funcs[i].name == funcname) {
                flag = true;
                break;
            }
        }
        resolve(flag);
    });
}

module.exports = {
    func_unban
}