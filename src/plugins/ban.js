const access_control = require("../access_control");

async function func_ban(mirai, sender, msg, query) {
    return new Promise(async (resolve, reject) => {
        if (query[1] == "qq" && is_qq(query[2]) && (is_func(query[3]) || query[3] == "all")) {
            let data = await access_control.get_user(query[2]);
            let menu = await all_func();
            menu = menu.join(",");
            let ban = query[3] == "all" ? menu : query[3];
            //检测之前有无ban掉的同名命令
            if (query[3] != "all" && data != 0) {
                let oldban = data.ban.split(",");
                if (oldban.indexOf(ban) != -1) {
                    msg.reply("之前就ban掉他了哦", true);
                    resolve(0)
                    return;
                }
            }
            if (data != 0) {
                data.ban = (data.ban == "") || (query[3] == "all") ? ban : data.ban + "," + ban;
                await access_control.update_user(data);
                msg.reply("这就ban掉他");
                resolve(0);
                return;
            }
            else {
                data = {
                    "id": query[2],
                    "base": "0",
                    "allow": "",
                    "ban": ban
                };
                await access_control.update_user(data);
                msg.reply("这就ban掉他");
                resolve(0);
                return;
            }
        }
        else if (query[1] == "group" && (is_qq(query[2]) || query[2] == "here") && (is_func(query[3]) || query[3] == "all")) {
            let groupid = sender.indexOf(":") != -1 ? sender.split(":")[0] : query[2];
            let menu = await all_func();
            menu = menu.join(",");
            let ban = query[3] == "all" ? menu : query[3];
            let data = await access_control.get_group(groupid);

            if (query[3] != "all" && data != 0) {
                let oldban = data.ban.split(",");
                if (oldban.indexOf(ban) != -1) {
                    msg.reply("之前就ban掉他了哦", true);
                    resolve(0);
                    return;
                }
            }
            if (data != 0) {
                data.ban = (data.ban == "") || (query[3] == "all") ? ban : data.ban + "," + ban;
                await access_control.update_group(data);
                msg.reply("这就ban掉他");
                resolve(0);
                return;
            }
            else {
                data = {
                    "id": groupid,
                    "base": "0",
                    "allow": "",
                    "ban": ban
                };
                await access_control.update_group(data);
                msg.reply("这就ban掉他");
                resolve(0);
                return;
            }
        }
        else {
            msg.reply("格式错误");
            resolve(1);
            return;
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

async function all_func() {
    return new Promise(async (resolve, reject) => {
        let funcs = await access_control.get_all("funcs");
        let ans = [];
        for (i in funcs) {
            ans.push(funcs[i].name);
        }
        resolve(ans);
    });
}

module.exports = {
    func_ban,
    is_func,
    is_qq,
    all_func
}