// 插入内容
var levelup = require("levelup");
var promisefy = require("q-level");

var db = promisefy(levelup("./mydb"));

// 读取流

db.createReadStream()
    .progress(function(data){
        console.log(data.key, "=", data.value);
    });
