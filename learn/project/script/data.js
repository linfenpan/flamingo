define(function(require, module, exports){
    module.exports = {
        data: require("../data/data.json"),
        style: require("../css/user.css")
    };
    var user = require("user.js");
    console.log(user);
    console.log(require("$"));
});
