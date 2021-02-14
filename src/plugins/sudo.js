// const events_router = require("../events_router");
// const access_control = require("../access_control");

// async function func_sudo(mirai, sender, msg, query) {
//     return new Promise(function (resolve, reject) {
//         if (await access_control.filter(sender, msg.type, query)) {
//             events_router.selector(mirai,msg)
//         }
//         query.splice(0, 1);
//     })
// }

// module.exports = {
//     func_sudo
// }