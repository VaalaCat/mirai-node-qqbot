const request = require("request");
const ical = require('node-ical');
const mytime = require('./time');

async function func_calendar(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {
        let mode = msg.type;
        // if (mode != "GroupMessage") { msg.reply("此功能不支持私聊"); resolve(0); return; }
        var options = {
            "url": "https://api.ctfhub.com/User_API/Event/getAllICS",
            "method": "GET"
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = ical.sync.parseICS(body);
                let eve = []
                let output = ""
                // msg.reply(body);
                // body.url
                // body.summary
                // body.start/end
                // console.log(body);

                for (let k in body) {
                    if (body.hasOwnProperty(k)) {
                        const ev = body[k];
                        if (body[k].type == 'VEVENT') {
                            let tmpDate = new Date()
                            if (tmpDate < ev.end) {
                                eve.push(body[k])
                            }
                        }
                    }
                }
                eve.sort((a, b) => { return a.start - b.start })
                if (query.length == 2) {
                    if (query[1] == "list") {
                        output = '以下为近期比赛列表，#calendar 序号 获取详情:\n'
                        for (i in eve) {
                            if (i > 10) {
                                break
                            }
                            output += `${i}: ${eve[i].summary}\n`
                        }
                    }
                    else if (parseInt(query[1]) != NaN && parseInt(query[1]) <= 10 && parseInt(query[1]) >= 0) {
                        let cur = parseInt(query[1])
                        output += `比赛名称: ${eve[cur].summary}\n`
                        output += `开始时间: ${eve[cur].start.getFullYear()}/${eve[cur].start.getMonth() + 1}/${eve[cur].start.getDate()}->${eve[cur].start.toLocaleTimeString('en-GB')}\n`
                        output += `结束时间: ${eve[cur].end.getFullYear()}/${eve[cur].end.getMonth() + 1}/${eve[cur].end.getDate()}->${eve[cur].end.toLocaleTimeString('en-GB')}\n`
                        output += `链接地址: ${eve[cur].url}\n`
                        output += `时区: ${eve[cur].vtimezone}\n`
                        output += `比赛详情: ${eve[cur].description}\n`
                    } else {
                        msg.reply("格式错误,请输入 #calendar list 查看比赛列表")
                    }
                    msg.reply(output)
                    resolve(0);
                }
                else {
                    console.log("Network failed");
                    resolve(1);
                }
            }
        }
        request(options, callback);
    })
}

module.exports = {
    func_calendar
}