const request = require("request");

async function func_time(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {
        var myDate = new Date();
        msg.reply("" + myDate.getFullYear() + myDate.getMonth() + myDate.getDate() + myDate.getHours() + myDate.getMinutes() + myDate.getSeconds());
        resolve(0);
    })
}

module.exports = {
    func_time
}