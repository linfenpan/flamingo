"use strict";

console.log("函数参数的默认值、参数分割");

var addFunc = function addFunc(x) {
    var y = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];

    console.log("y默认12,相加: " + (x + y));
};
addFunc(12);

var totalFunc = function totalFunc(x) {
    for (var _len = arguments.length, vals = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        vals[_key - 1] = arguments[_key];
    }

    console.log("所有值合并之后: " + (x + vals.join("")));
};
totalFunc("我叫", "da宗熊", ",", "很高兴认识你");

var sumFunc = function sumFunc(x, y, z) {
    console.log("总计算结果是: " + (x + y + z));
};
sumFunc.apply(undefined, [1, 2, 3]);