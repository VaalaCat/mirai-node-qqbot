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
bot.on('message', (msg) => {
	if (msg.text.startsWith("/id")) {
		bot.sendMessage(msg.chat.id, `${msg.chat.id}`);
	}
})
// listen groupid tgchatid/function
async function func_listen(mirai, sender, msg, query) {
	return new Promise(function (resolve, reject) {
		if (query[2] != "delete") {
			message_listener.listenGroup(query[1], query[2]);
			msg.reply(`群聊${query[1]}的消息将会转发到${query[2]}`);
		} else if (query[2] == "delete") {
			message_listener.deleteListenEvent(query[1]);
			msg.reply(`消息来源${query[1]}的消息转发规则已删除`);
		}
	});
}

module.exports = {
	func_listen
}