"use strict";
var levelup = require("levelup");
var promisefy = require("q-level");

// 创建一个数据库，levelup 中，默认调用了 db.open
var db = promisefy(levelup("./mydb"));

// 存入一个 name
db.put("name", "LevelUp")
    .catch(function(err){
        console.log("put错误:", err);
    })
    .then(function(){
        return db.get("name");
    })
    .catch(function(err){
        console.log("get错误", err);
    })
    .then(function(value){
        console.log("name::==>" + value);
        return db.close();
    })
    .then(function(){
        console.log("关闭成功");
    });
