// 插入内容
var levelup = require("levelup");
var promisefy = require("q-level");

var db = levelup("./mydb");

// 批量处理
db.batch()
    .del("name")
    .put("teacher", "汪汪")
    // .del("teacher")
    // .clear()    // 取消上面的所有操作
    .write(function(){
        console.log("操作完毕");

        db.get("teacher", function(err, name){
            console.log("名字:", name);
        });
    });
