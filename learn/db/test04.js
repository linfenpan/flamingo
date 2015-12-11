// 插入内容
var levelup = require("levelup");
var promisefy = require("q-level");

var db = promisefy(levelup("./mydb"));

// 批处理
//  {type: 操作类型，默认是 put, key: id, value: 值}
var list = [
    {key: "father", value: "大黑"},
    {type: "put", key: "mother", value: "大白"}
];

var def = db.batch(list);
def.then(function(a, b){
    console.log("操作成功", a, b);
});
def.catch(function(e){
    console.log("操作失败", e);
});
