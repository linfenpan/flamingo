// 插入内容
var levelup = require("levelup");
var promisefy = require("q-level");

var db = promisefy(levelup("./mydb"));

// 插入数据
var df = db.get("name")
df.catch(function(err){
    console.log("查询错误", err);
});
df.then(function(value){
    console.log("值:" + value);
});
