async function func_pa(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {
        senderName = (typeof msg.sender.memberName == "undefined" ? msg.sender.nickname : msg.sender.memberName);
        msg.reply(senderName + "给爷爬");
    })
}

module.exports = {
    func_pa
}