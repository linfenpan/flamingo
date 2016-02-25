"use strict";

var _templateObject = _taggedTemplateLiteral(["In ES5 \"\n\" is a line-feed."], ["In ES5 \"\\n\" is a line-feed."]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var events = [1, 2, 3, 4, 5, 6];
var odds = events.map(function (v) {
    return v + 1;
});
console.log("odds: ", odds);

// Lexical this
var bob = {
    _name: "Bob",
    _friends: [],
    printFriends: function printFriends() {
        var _this = this;

        this._friends.forEach(function (f) {
            return console.log(_this._name + " knows " + f);
        });
    }
};

var objPrototype = {
    toString: function toString() {
        return "自定义object";
    }
};

var objName = "dashareB";
var selfObject = _defineProperty({
    __proto__: objPrototype,
    objName: objName
}, "prop_" + function () {
    return 42;
}(), 42);
console.log(selfObject.toString() + ", 其中 prop_42:" + selfObject.prop_42);

console.log("用斜引号的字符串也可以使用了");
var name = "da宗熊";
console.log("也可以使用模板表达式了: " + name);
// String.raw 是对斜杠进行转义咧~
String.raw(_templateObject);
// String.raw 也可以作为模板，替换之
// 下面两者是等价的
console.log(String.raw({ raw: "test" }, 0, 1, 2));
console.log(String.raw({ raw: ["t", "e", "s", "t"] }, 0, 1, 2));