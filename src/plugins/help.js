const config = require("config");
let access_control = require("../access_control");

async function func_help(mirai, sender, msg, query) {
	return new Promise(async (resolve, reject) => {
		let menu = await access_control.get_all("funcs");
		let ans = "";
		let mode = msg.type;
		for (i in menu) {
			if (await access_control.filter(sender, mode, [menu[i].name]) > 0) {
				ans += "\n#" + menu[i].name;
			}
		}
		msg.reply(ans.substring(1));
		resolve(0);
	})
}

module.exports = {
	func_help
}