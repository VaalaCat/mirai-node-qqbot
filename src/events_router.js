const EventEmitter = require('events');
const request = require("request");
const jsdom = require("jsdom");
const config = require("config");
var sqlite3 = require("sqlite3");

const access_control = require("./access_control");
const { resolve } = require('path');
const { func_talk } = require('./plugins/talk');
const { isAt } = require('mirai-ts/dist/utils/check');

const eventEmitter = new EventEmitter();

var plugins = require("require-all")({
	dirname: __dirname + "/plugins",
	recursive: false
})

var format = config.get("func");
var basicConfig = config.get("basic");
var menu = Object.keys(format);

async function register_plugins() {
	return new Promise(async (resolve, reject) => {
		for (i in menu) {
			eventEmitter.on(menu[i], async (mirai, sender, msg, query) => {
				try {
					await plugins[query[0]]["func_" + query[0]](mirai, sender, msg, query);
				}
				catch (error) {
					console.log(menu[i], "error:", error);
				}
			});
		}
		resolve(0);
	});
}

function message_to_string(messageChain) {
	let ans = "";
	for (i in messageChain) {
		if (messageChain[i].type == "Plain") {
			ans += messageChain[i].text;
		}
	}
	return ans;
}

async function selector(mirai, msg) {
	return new Promise(async function (resolve, reject) {
		//暂时不处理图片
		let sender = (msg.type == "FriendMessage") ? msg.sender.id + "" : (String(msg.sender.group.id) + ":" + String(msg.sender.id));
		let query = message_to_string(msg.messageChain);
		let mode = msg.type;
		let keywords = await access_control.get_keyword(query);

		if (query.indexOf("#") == 0) {
			for (let i in menu) {
				if (query.indexOf(menu[i]) == 1 && (query.indexOf(" ") == menu[i].length + 1 || query.length == menu[i].length + 1)) {
					query = query.substring(1);
					query = query.split(" ");
					for (let i in query) {
						if (query[i] == "") {
							query.splice(i, 1);
						}
					}
					//权限正确
					let flag = await access_control.filter(sender, mode, query);
					console.log(sender, mode, flag)
					if (flag) {
						if (query.length == format[menu[i]].query || format[menu[i]].query == "strings") {
							query = format[menu[i]].query == "strings" ? Array(query[0], msg.plain.slice(msg.plain.indexOf(" ") + 1)) : query
							//这里传进去的msg不是字符串哦，query是以第一个元素为命令，后面都是参数的数据组成的数组，qqid指的是bot的qq
							console.log("Exec:", query)
							eventEmitter.emit(menu[i], mirai, sender, msg, query);
							resolve(0);
						}
						else {
							msg.reply("格式错误");
							resolve(0);
						}
					}
				}
			}
		}
		// redir nonFunc FriendMessage and TempMessage or Ated msg to admin qqid
		else if (mode == "FriendMessage" || mode == "TempMessage" || msg.isAt()) {
			senderName = (typeof msg.sender.memberName == "undefined" ? msg.sender.nickname : msg.sender.memberName);
			if (mode == "TempMessage" || mode == "GroupMessage") {
				senderName ="来自 "+ msg.sender.group.name+" 的 "+senderName;
			}
			senderName += "说：\n"
			func_talk(mirai, sender, msg, ["talk", "qq", basicConfig.adminqqid, sender+"\n"+senderName+query]);
		}
		//这里添加关键词监听
	})
}

module.exports = {
	selector,
	register_plugins
}