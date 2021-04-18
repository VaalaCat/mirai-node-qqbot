const schedule = require('node-schedule');
const validator = require('validator');

function time_checker(timer) {
    tmp_time = timer[1]
    if (validator.isISO8601(tmp_time)) {
        return true;
    } return false;
}

async function func_alert(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {
        if (!time_checker(query)) { msg.reply('格式错误'); resolve(1); return }
        msg.reply('小vaala会在：' + new Date() + ' 时提醒宁')
        let alertDate = new Date(query[1])
        schedule.scheduleJob(alertDate, () => {
            msg.reply('小Vaala提醒宁：' + query[2], true);
        })
    })
}

module.exports = {
    func_alert
}