const EventEmitter = require('events');
const config = require("config");
const Mirai = require("mirai-ts");
const yaml = require("js-yaml");
const events_router = require("./events_router");
const access_control = require('./access_control');
const fs = require("fs");

const eventEmitter = new EventEmitter();

const conf = config.get("basic");

const qqid = conf.qqid;
const qq = qqid;

// const mahConfig = {
// 	host: conf.host,
// 	port: conf.port,
// 	authKey: conf.authKey,
// 	enableWebsocket: true,
// };

const mahConfig = yaml.load(
	fs.readFileSync(
		"./config/setting.yml",
		"utf8"
	)
);

const mirai = new Mirai(mahConfig);

//绑定插件事件选择器
eventEmitter.on("selector", async function (mirai, msg) {
	let code = await events_router.selector(mirai, msg);
	if (code != 0) {
		console.log("发生异常");
	}
})

async function event_handler(mirai, msg) {
	eventEmitter.emit("selector", mirai, msg);
}

async function main() {
	// 登录 QQ
	await mirai.link(qq);
	await events_router.register_plugins();
	await access_control.init_database();
	mirai.on("message", (msg) => {
		// console.log(msg);
		event_handler(mirai, msg);
	});
	mirai.listen();
}

main();