// 插入内容
var levelup = require("levelup");
var promisefy = require("q-level");

var db = promisefy(levelup("./mydb"));

// 删除数据
//  就算删除不存在的数据，也会成功的说..
var df = db.del("name")
df.catch(function(err){
    console.log("删除错误", err);
});
df.then(function(value){
    console.log("删除成功:" + value);
});
