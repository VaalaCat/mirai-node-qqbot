function getFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    if (month >= 1 && month <= 9) { month = "0" + month; }
    if (strDate >= 0 && strDate <= 9) { strDate = "0" + strDate; }
    if (strHours >= 0 && strHours <= 9) { strHours = "0" + strHours; }
    if (strMinutes >= 0 && strMinutes <= 9) { strMinutes = "0" + strMinutes; }
    if (strSeconds >= 0 && strSeconds <= 9) { strSeconds = "0" + strSeconds; }
    var currentDate = date.getFullYear() + "-" + month + "-" + strDate
        + "T" + strHours + ":" + strMinutes + ":" + strSeconds + 'Z';
    return currentDate;
}

async function func_time(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {
        msg.reply(getFormatDate());
        resolve(0);
    })
}

module.exports = {
    func_time
}