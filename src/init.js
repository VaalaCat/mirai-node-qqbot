const sqlite3 = require('sqlite3');

async function init_database() {
	return new Promise(async (resolve, reject) => {
		let eventsDatabase = new sqlite3.Database("./data/events.db", (error) => { if (error) { console.log("数据库启动错误"); } });
		eventsDatabase.run("create table if not exists listen(groupid text text primary key not null, behave text not null)");
	})
}

init_database()