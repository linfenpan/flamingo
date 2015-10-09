// var data = require("../data/data.json"), style = require("../css/user.css");
//
// module.exports = {
//     user: data,
//     css: style
// };
define(function(require, module, exports){
    console.log("进来这里了..");
    var data = require("../data/data.json", function(data){
        console.log(data);
    });
    exports.age = 11;
});
