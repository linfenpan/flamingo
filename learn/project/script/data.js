define(function(require, module, exports){
    module.exports = {
        data: require("../data/data.json"),
        style: require("../css/user.css")
    };
    var user = require("user.js");
    
    console.log(require("$"));
    console.log(require("data"));
    console.log(require("./data2.js"));
});

define("data", "这是个数据");
