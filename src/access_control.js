const { get } = require("config");
const config = require("config");
const { default: Mirai } = require("mirai-ts");
var sqlite3 = require("sqlite3");

async function get_user(id) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        database.get("select id,base,allow,ban from users where id = ?", [id], (error, row) => {
            if (error) {
                resolve(1);
            }
            resolve(typeof row == "undefined" ? 0 : row);
        });
    });
}

async function update_user(userdata) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        let olddata = await get_user(userdata.id);
        if (olddata == 0) {
            database.run("insert into users (id,base,allow,ban) values (?, ?, ?, ?)", [userdata.id, userdata.base, userdata.allow, userdata.ban], (error) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
            });
        }
        else {
            database.run("update users set base=?, allow=?, ban=? where id=?", [userdata.base, userdata.allow, userdata.ban, userdata.id], (error) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
            });
        }
        resolve(0);
    });
}

async function remove_user(id) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        let olddata = await get_user(id);
        if (olddata == 0) {
            resolve(1);
        }
        else {
            database.run("delete from users where id=?", id, (error) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
            });
        }
        resolve(0);
    });
}

async function get_group(id) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        database.get("select id,base,allow,ban from groups where id = ?", [id], (error, row) => {
            if (error) {
                resolve(1);
            }
            resolve(typeof row == "undefined" ? 0 : row);
        });
    });
}

async function update_group(groupdata) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        let olddata = await get_group(groupdata.id);
        if (olddata == 0) {
            database.run("insert into groups (id,base,allow,ban) values (?, ?, ?, ?)", [groupdata.id, groupdata.base, groupdata.allow, groupdata.ban], (error) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
            });
        }
        else {
            database.run("update groups set base=?, allow=?, ban=? where id=?", [groupdata.base, groupdata.allow, groupdata.ban, groupdata.id], (error) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
            });
        }
        resolve(0);
    });
}

async function remove_group(id) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        let olddata = await get_group(id);
        if (olddata == 0) {
            resolve(1);
        }
        else {
            database.run("delete from groups where id=?", id, (error) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
            });
        }
        resolve(0);
    });
}

async function get_all(mode) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        if (mode == "funcs") {
            database.all("select name,base,query,strict,ban from funcs", (error, row) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
                resolve(row);
            });
        }
        else {
            database.all("select id,base,allow,ban from " + mode, (error, row) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
                resolve(row);
            });
        }

    })
}

async function get_func(funcname) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        database.get("select name,base,query,strict,ban from funcs where name = ?", [funcname], (error, row) => {
            if (error) {
                resolve(1);
            }
            resolve(typeof row == "undefined" ? 0 : row);
        });
    });
}

async function update_func(funcdata) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        let olddata = await get_func(funcdata.name);
        if (olddata == 0) {
            database.run("insert into funcs (name,base,query,strict,ban) values (?, ?, ?, ? ,?)", [funcdata.name, funcdata.base, funcdata.query, funcdata.strict, funcdata.ban], (error) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
            });
        }
        else {
            database.run("update funcs set base=?, query=? ,strict=? ,ban=?  where name=?", [funcdata.base, funcdata.query, funcdata.strict, funcdata.ban, funcdata.name], (error) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
            });
        }
        resolve(0);
    });
}

async function remove_func(funcname) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        let olddata = await get_func(funcname);
        if (olddata == 0) {
            resolve(1);
        }
        else {
            database.run("delete from funcs where name=?", [funcname], (error) => {
                if (error) {
                    console.log(error);
                    resolve(1);
                }
            });
        }
        resolve(0);
    });
}

async function init_database() {
    return new Promise(async (resolve, reject) => {
        let user = config.get("user");
        let group = config.get("group");
        let func = config.get("func");
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误"); } });
        database.run("create table if not exists users(id text primary key not null, base int not null, allow text not null, ban text not null)");
        database.run("create table if not exists groups(id text primary key not null, base int not null, allow text not null, ban text not null)");
        database.run("create table if not exists funcs(name text primary key not null, base int not null, query int not null, strict text not null, ban text not null)");
        database.run("create table if not exists listen(word text primary key not null, func text not null)");
        //先处理user
        for (let i in user) {
            let allow = config.has("user." + i + ".allow") ? user[i].allow : "";
            let ban = config.has("user." + i + ".ban") ? user[i].ban : "";
            await update_user({
                "id": i,
                "base": user[i].base,
                "allow": allow,
                "ban": ban
            });
        }
        for (let i in group) {
            let allow = config.has("group." + i + ".allow") ? group[i].allow : "";
            let ban = config.has("group." + i + ".ban") ? group[i].ban : "";
            await update_group({
                "id": i,
                "base": group[i].base,
                "allow": allow,
                "ban": ban
            });
        }
        for (let i in func) {
            let strict = config.has("func." + i + ".strict") ? func[i].strict : "";
            let ban = config.has("func." + i + ".ban") ? group[i].ban : "";
            await update_func({
                "name": i,
                "base": func[i].base,
                "ban": ban,
                "query": func[i].query,
                "strict": strict
            });
        }
        database.close();
        resolve(0);
    });
}

async function filter(sender, mode, query) {
    return new Promise(async (resolve, reject) => {
        sender = sender.toString().split(":");
        let cmd = await get_func(query[0])
        let user = await get_user(sender[sender.length - 1])
        let group = await get_group(sender.length == 2 ? sender[0] : "0");
        let userallow = 0;
        let ans = 0;
        let userbase = 0;
        if (user != 0) {
            let ban = user.ban.split(",");
            let allow = user.allow.split(",");
            if (user.base >= 5) { ans += user.base; }
            if (user.ban != "" ? ban.indexOf(query[0]) != -1 : 0) { ans -= 2; }
            else if (user.base >= cmd.base) {
                if (cmd.strict == "1") {
                    if (allow != "" ? allow.indexOf(query[0]) != -1 : 0) { ans += 2; userallow = 1; }
                    else { ans -= 2; }
                }
                else { ans++; userbase = 1; }
            }
            else { ans--; }
        }
        if (group != 0 && (mode == "GroupMessage" || mode == "TempMessage")) {
            let ban = group.ban.split(",");
            let allow = group.allow.split(",");
            if ((ban != "" ? ban.indexOf(query[0]) != -1 : 0) && userallow == 0) {
                ans -= 2;
            }
            else if (group.base >= cmd.base || userbase == 1) {
                if (cmd.strict == "1") {
                    if ((allow != "" ? allow.indexOf(query[0]) != -1 : 0) || userallow != 0) { ans++; }
                    else { ans -= 2; }
                }
                else { ans++; }
            }
            else { ans--; }
        }
        else { if (cmd.base == 0 && cmd.strict != "1") { ans++; } }
        resolve(ans <= 0 ? 0 : ans);
    });
}

async function get_keyword(message) {
    return new Promise(async (resolve, reject) => {
        let database = new sqlite3.Database("./data/permission.db", (error) => { if (error) { console.log("数据库启动错误") } })
        database.run("select * from listen", (result, error) => {
            if (error) { console.log("数据库错误"); resolve(1) }
            else { resolve(result) }
        })
    })
}

module.exports = {
    filter,
    init_database,
    get_user,
    update_user,
    remove_user,
    get_group,
    update_group,
    remove_group,
    get_all,
    get_func,
    update_func,
    remove_func,
    get_keyword
}