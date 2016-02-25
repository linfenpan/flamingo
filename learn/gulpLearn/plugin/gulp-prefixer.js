"use strict";
var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;

// 常量
const PLUGIN_NAME = "gulp-prfixer";

function gulpPrefixer(prefixText) {
    if (!prefixText) {
        throw new PluginError(PLUGIN_NAME, "Missing prefix text!");
    }

    prefixText = new Buffer(prefixText);

    // 创建一个 stream 通道
    var steam = through.obj(function(file, enc, cb){
        // console.log(enc); enc 是文件编码？
        if (file.isStream()) {
            this.emit("error", new PluginError(PLUGIN_NAME, "Stream is not supported!"));
        }

        if (file.isBuffer()) {
            file.contents = Buffer.concat([prefixText, file.contents]);
        };

        // 确保文件，进入下一个 gulp 插件
        this.push(file);

        // 告诉 steam 引擎，已经处理完这个文件
        cb();
    });

    return steam;
};

module.exports = gulpPrefixer;
