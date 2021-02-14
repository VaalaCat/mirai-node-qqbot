const { ResourceLoader } = require("jsdom");
const access_control = require("../access_control");

async function func_setperm(mirai, sender, msg, query) {
    return new Promise(async (resolve, reject) => {
        if (query[1] == "qq" && is_qq(query[2]) && (is_func(query[3]) || query[3] == "all")) {
            let data = await access_control.get_user(query[2]);
            
        }
        else if (query[1] == "group" && (is_qq(query[2]) || query[2] == "here") && (is_func(query[3]) || query[3] == "all")) {
            let groupid = sender.indexOf(":") != -1 ? sender.split(":")[0] : query[2];
            let menu = await all_func();
            menu = menu.join(",");
            let ban = query[3] == "all" ? menu : query[3];
            let data = await access_control.get_group(groupid);
            
        }
        else {
            msg.reply("格式错误");
            resolve(1);
            return;
        }
    });
}

module.exports = {
    func_setperm
}