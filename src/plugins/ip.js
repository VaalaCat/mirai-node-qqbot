const jsdom = require("jsdom");
const request = require("request");

const { JSDOM } = jsdom;

async function func_ip(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {

        var options = {
            "url": "http://www.cip.cc/" + query[1],
            "method": "GET",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36 Edg/86.0.622.43",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                let data = new JSDOM(body);
                data = data.window.document.querySelector("div.data.kq-well").textContent;
                data = data.replace("\n\t\t\t\t", "").replace("\n\n\t\t", "").replace("\n\n", "\n");
                data = data.replace("\n\n", "\n");
                data = data.replace("\n\n", "\n");
                data = data.replace("\t", "").replace("<br />", "\n").replace("<br />", "\n").replace("<br />", "\n");
                msg.reply(data, true);
                resolve(0);
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
    func_ip
}