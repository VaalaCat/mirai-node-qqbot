var fs = require("fs");
var rand = require("./rand");

function checkNum(num) {
    var reg = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/
    if (!reg.test(num)) {
        return false;
    } else {
        return true;
    }
}

async function func_guess(mirai, sender, msg, query) {
    return new Promise((resolve, reject) => {
        var file_path = "./data/guess/number";
        fs.exists(file_path, async (is_exists) => {
            let is_num = checkNum(query[1]);
            if (!is_exists && query[1] == "start") {
                var num = await rand.func_rand(url, qqid, session, body, sender, mode, ["rand", "10000"]);
                num = num[0].text;
                fs.writeFile(file_path, num, (error) => {
                    if (error) {
                        resolve([{ "type": "Plain", "text": "保存数据错误" }]);
                    }
                    fs.readFile(file_path, function (err, data) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log("随机数生成:" + data.toString());
                    });
                });
                resolve([{ "type": "Plain", "text": "猜数游戏开始！这个数字在0，10000之间" }]);
            }
            else if (!is_exists && query[1] != "start") {
                resolve([{ "type": "Plain", "text": "游戏并未开始，请先开始游戏" }]);
            }
            else if (is_exists && !is_num) {
                resolve([{ "type": "Plain", "text": "游戏已经开始，请输入正确的十进制数" }]);
            }
            else if (is_exists && is_num) {
                let buf = new Buffer.alloc(1024);
                fs.open(file_path, "r+", (error, fd) => {
                    if (error) {
                        resolve([{ "type": "Plain", "text": "插件错误" }]);
                    }
                    fs.read(fd, buf, 0, buf.length, 0, (error, bytes) => {
                        let true_num;
                        if (error) {
                            resolve([{ "type": "Plain", "text": "文件系统错误" }]);
                        }
                        if (bytes > 0) {
                            true_num = parseInt(buf.slice(0, bytes).toString());
                            let guess_num = parseInt(query[1]);
                            if (guess_num == true_num) {
                                fs.unlink(file_path, function (err) {
                                    if (err) {
                                        console.log("删除文件出错");
                                    }
                                    console.log("文件删除成功！");
                                });
                                resolve([{ "type": "Plain", "text": "恭喜你猜对啦" }]);
                            }
                            else if (guess_num > true_num) {
                                resolve([{ "type": "Plain", "text": "猜大了，爬" }]);
                            }
                            else {
                                resolve([{ "type": "Plain", "text": "猜小了，爬" }]);
                            }
                        }
                    })
                });
            }
            else {
                resolve([{ "type": "Plain", "text": "未知错误" }]);
            }
        });
    });
}

module.exports = {
    func_guess
}

