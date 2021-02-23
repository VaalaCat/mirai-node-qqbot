
const func_hello = async (mirai, sender, msg, query) => {
    return new Promise((resolve, reject) => {
        msg.reply("大家好我是小Vaala，Vaala把我自己开源辣\n不懂怎么用的自己去翻源码\n格式错误的都给👴爪巴\n客户端：https://github.com/VaalaCat/mirai-node-qqbot\n服务端：https://github.com/VaalaCat/mirai-docker\n球球各位给可爱的小vaala点个8")
    })
}

module.exports = {
    func_hello
}