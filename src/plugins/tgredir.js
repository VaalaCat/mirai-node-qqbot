const TelegramBot = require('node-telegram-bot-api');
const config = require("config");
const conf = config.get("basic");
const tgtoken = process.env.TGTOKEN || ''
const bot = new TelegramBot(tgtoken, {
	polling: false,
	request: {
		proxy: conf.proxy,
	},
});

async function func_tgredir(mirai, sender, msg, query) {
	return new Promise(function (resolve, reject) {
		mode = msg.type;
		senderName = (typeof msg.sender.memberName == "undefined" ? msg.sender.nickname : msg.sender.memberName);
		// if (mode == "TempMessage" || mode == "GroupMessage") {
		// 	senderName ="来自 "+ msg.sender.group.name+" 的 "+senderName;
		// }

		senderName += `(${sender.split(":")[1]})说：\n`
		senderName = senderName.replace("80000000", "匿名")
		for(singleMsg in msg){
			if(singleMsg.type == "Plain"){
				bot.sendMessage(query[1], senderName + query[0]);
			} else if (singleMsg.type == "Image"){
				bot.sendMessage(query[1], senderName);
				bot.sendPhoto(query[1], singleMsg.url);
			}
		}
		
	})
}

module.exports = {
	func_tgredir
}