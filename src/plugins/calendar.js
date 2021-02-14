const request = require("request");

async function func_calendar(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {
        let mode = msg.type;
        if (mode != "GroupMessage") { msg.reply("此功能不支持私聊"); resolve(0); return; }
        var options = {
            "url": "https://api.yoshino-s.online/calendar/recent",
            "method": "GET"
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body)
                body = calendar_message_generator(body);
                msg.reply(body);
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

function calendar_message_generator(body) {
    let ans = "最近的比赛有：";
    for (i in body) {
        let tmp = "\n\n";
        let starttime = body[i]["start"];
        let endtime = body[i]["end"];
        starttime = new Date(starttime);
        endtime = new Date(endtime);
        starttime = starttime.toLocaleDateString() + " " + starttime.toLocaleTimeString();
        endtime = endtime.toLocaleDateString() + " " + endtime.toLocaleTimeString();
        tmp += (body[i]["name"] + ":\n");
        tmp += ("网址:" + body[i]["website"] + "\n");
        tmp += ("开始时间:" + starttime + "\n");
        tmp += ("结束时间:" + endtime);
        ans += tmp;
    }
    return ans;
}

module.exports = {
    func_calendar
}