var message_listener = require("../message_listener");
const TelegramBot = require('node-telegram-bot-api');
const config = require("config");
const conf = config.get("basic");
const tgtoken = process.env.TGTOKEN || ''
const bot = new TelegramBot(tgtoken, {
	polling: true,
	request: {
		proxy: conf.proxy,
	},
});
// listen groupid tgchatid
async function func_listen(mirai, sender, msg, query) {
	return new Promise(function (resolve, reject) {
		if (query[1] == "getid") {
			bot.on('message', (msg) => {
				bot.sendMessage(msg.chat.id, `消息${msg.text}来自${msg.chat.id}`);
			})
		} else if (query[2] != null) {
			message_listener.listenGroup(query[1], query[2]);
			msg.reply(`群聊${query[1]}的消息将会转发到${query[2]}`);
		}
	});
}

module.exports = {
	func_listen
}