const request = require("request");

async function func_nslookup(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {
        var data = "inputurl=" + query[1] + "&server=8.8.8.8&leixing=A"

        var options = {
            "headers": { "Content-Type": "application/x-www-form-urlencoded" },
            "url": "http://tools.bugscaner.com/api/nslookup/",
            "method": "POST",
            "body": data
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                if (JSON.parse(body).error == "") {
                    msg.reply(JSON.parse(body).info);
                    resolve(0)
                }
                else {
                    msg.reply("请求错误");
                    resolve(1);
                }
            }
            else {
                console.log("Network failed");
                resolve(1);
            }
        }
        request(options, callback);
    })
}

module.exports = {
    func_nslookup
}