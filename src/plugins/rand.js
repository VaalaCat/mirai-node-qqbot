const request = require("request");
// https://www.random.org/integers/
// ?num=1
// &min=1
// &max=100
// &col=1
// &base=10
// &format=plain
// &rnd=new

async function func_rand(mirai, sender, msg, query) {
    return new Promise((resolve, reject) => {
        var data = "num=1&min=1&col=1&base=10&format=plain&rnd=new&max=" + query[1];

        var options = {
            "url": "https://www.random.org/integers/?" + data,
            "method": "GET"
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                msg.reply(body.replace("\n", ""), true);
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
    func_rand
}