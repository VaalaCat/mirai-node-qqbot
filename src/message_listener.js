
var sqlite3 = require("sqlite3");

/**
 * 添加监听群组并指定监听行为
 * @param {*} group_id 监听群组id
 * @param {*} behave 监听行为
 * @returns {boolean} 是否成功
 */
async function listenGroup(group_id,behave){
	return new Promise((resolve, reject) => {
		let database = new sqlite3.Database("./data/events.db", (error) => { if (error) { console.log("数据库启动错误"); } });
		database.run("insert into listen(groupid,behave) values (?,?)", [group_id,behave], (error) => {
			if (error) {
				resolve(1);
			}
			resolve(0);
		})
	})
}

/**
 * 检测群组是否已经监听和监听行为
 * @param {*} group_id 群组id
 * @returns {*} 返回监听行为
 */
async function getGroupBehavior(group_id){
	return new Promise((resolve, reject) => {
		let database = new sqlite3.Database("./data/events.db", (error) => { if (error) { console.log("数据库启动错误"); } });
		database.get("select * from listen where groupid = ?", group_id, (error, row) => {
			if (error) {
				resolve(1);
			}
			resolve(typeof row == "undefined" ? 0 : row);
		})
	})
}

module.exports = {
	listenGroup,
	getGroupBehavior
}