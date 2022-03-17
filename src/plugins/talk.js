//#talk qq/group/tmp xxxx[:xxxx] [message]
// 0     1                   2           3
// talk to a friend or group
async function func_talk(mirai, sender, msg, query) {
    return new Promise(function (resolve, reject) {
        msgToSend = query[3];
        msgMode = query[1];
        msgDist = query[2];

        if (msgMode == "qq") {
            mirai.api.sendFriendMessage(msgToSend,msgDist);
            
        } else if (msgMode == "group") {
            mirai.api.sendGroupMessage(msgToSend,msgDist);
        }else{
            distQQ=msgDist.split(':')[1];
            distGroup=msgDist.split(':')[0];
            mirai.api.sendTempMessage(msgToSend,distQQ,distGroup);
        }
    })
}

module.exports = {
    func_talk
}