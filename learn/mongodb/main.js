"use strict";

var mongodb = require("mongodb");
var server = new mongodb.Server("localhost", 27017, {auto_reconnect: true});
var db = new mongodb.Db("test", server, {safe: true});

// 链接db
db.open(function(err, db){
    if (err) {
        console.log(err);
        return;
    }

    console.log("connect db");
    db.createCollection("mycoll", {safe: true}, function(err, collection){
        if (err) {
            console.log(err);
            return;
        }

        // 新增数据
        // var tmp1 = {id: "1", title: "hello", number: 1};
        // collection.insert(tmp1, {safe: true}, function(err, result){
        //     console.log(result);
        //     db.close();
        // });

        // 更新数据
        // collection.update({title: "hello"}, {$set: {number: 3}}, {safe: true}, function(err, result){
        //     console.log(result);
        //     db.close();
        // });

        // 删除数据
        // collection.remove({title: "hello"}, {safe: true}, function(err, result){
        //     console.log(result);
        //     db.close();
        // });

        // 寻找
        collection.find().toArray(function(err, list){
            console.log(list);
            db.close();
        });
    });


    // 删除集合
    // db.dropCollection("mycoll", {safe: true}, function(err, result){
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("删除完成");
    //     }
    //     db.close();
    // });
});
