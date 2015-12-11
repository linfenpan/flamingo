// 插入内容
var levelup = require("levelup");
var promisefy = require("q-level");

var db = levelup("./mydb");

// 读取流

db.createReadStream()
    .on("data", function(data){
        console.log("数据:" + data.key + " = " + data.value);
    })
    .on("end", function(){
        console.log("流关闭了");
    });

// db.createKeyStream(); 读取 key
// db.createValueStream(); 读取 value
