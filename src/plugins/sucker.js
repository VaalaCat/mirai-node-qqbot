const request = require("request");

async function func_sucker(mirai, sender, msg, query) {
    return new Promise((resolve, reject) => {
        var options = {
            "url": "https://cloud.qqshabi.cn/api/tiangou/api.php",
            "method": "GET"
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                msg.reply(body)
                resolve(0);
            }
            else {
                console.log("Network failed");
                resolve(1);
            }
        }
        request(options, callback);
    });
}

module.exports = {
    func_sucker
}
