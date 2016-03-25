var Observable = require("FuseJS/Observable");

var inputValue = Observable("pure value");
exports.inputValue = inputValue;
exports.bindEditAndInputChange = function(el){
    inputValue.value = el.value;
};

var name = Observable("");
var greeting = name.map(function(name){
    if (name == "") {
        return "Type your name above";
    } else {
        return "Hello there, "+ name +"!"
    }
});

var clearName = function(){
    name.value = "";
};

exports.name = name;
exports.greeting = greeting;
exports.clearName = clearName;
