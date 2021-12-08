const request = require("request");
const config = require("config");
const conf = config.get("basic");

const func_acg = async (mirai, sender, msg, query) => {
    return new Promise(async (resolve, reject) => {
        var options = {
            "url": "https://www.rrll.cc/tuceng/ecy.php?return=json",
            "method": "GET"
        };
        console.log(conf)
        if (typeof conf.proxy !== "undefined") {
            options.proxy = conf.proxy
        }
        const callback = (error, response, body) => {
            if (!error && response.statusCode == 200) {
                ret = JSON.parse(body);
                if (ret.code == 200) {
                    imgurl = ret.acgurl.split("\\/").join("//");
                    tmpimg = [{
                        "type": "Image",
                        "url": imgurl,
                        "path": null
                    }]
                    msg.reply(tmpimg);
                    resolve(0);
                }
                else {
                    msg.reply("没🤮了，憋🐛🌶");
                    resolve(0);
                }
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
    func_acg
}
