// 插入内容
var levelup = require("levelup");
var promisefy = require("q-level");

var db = promisefy(levelup("./mydb"));

// 插入数据
db.put("name", "测试名字")
    .catch(function(){
        console.log("插入错误");
    }).then(function(){
        console.log("插入成功");
    });
