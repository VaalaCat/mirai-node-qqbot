const request = require("request");

const func_setu = async (mirai, sender, msg, query) => {
    return new Promise(async (resolve, reject) => {
        let apikey = process.env.SETUAPIKEY || ''
        var options = {
            "url": "https://api.lolicon.app/setu/?apikey=" + apikey + "&r18=0&size1200=1",
            "method": "GET"
        };
        const callback = (error, response, body) => {
            if (!error && response.statusCode == 200) {
                ret = JSON.parse(body);
                if (ret.code === 0) {
                    imgurl = ret.data[0].url;
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
    func_setu
}
