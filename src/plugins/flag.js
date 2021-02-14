const request = require("request");

async function func_flag(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {
        if (query[1].indexOf("vaalacat") != -1) {
            msg.reply("flag{vaalacat_yyds}");
            resolve(0);
        }
        else {
            msg.reply("谁是yyds");
            resolve(0);
        }
    })
}

module.exports = {
    func_flag
}