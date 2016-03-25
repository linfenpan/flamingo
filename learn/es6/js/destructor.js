"use strict";

console.log("解构赋值:");

var a = 1;
var b = 2;
var _ref = [b, a];
a = _ref[0];
b = _ref[1];

console.log("a == 2:" + (a == 2));
console.log("b == 1:" + (b == 1));

var _bar$foo = { bar: "bar", foo: "foo" };
var bar = _bar$foo.bar;
var foo = _bar$foo.foo;

console.log("bar:" + bar);
console.log("foo:" + foo);

var _bar$foo2 = { bar: "bar2", foo: "foo2" };
var bar2 = _bar$foo2.bar;
var foo2 = _bar$foo2.foo;

console.log("bar2:" + bar2);
console.log("foo2:" + foo2);

var _person$age = {
    person: {
        name: "da宗熊"
    },
    age: 12
};
var name = _person$age.person.name;
var age = _person$age.age;

console.log("深入获取名字:" + name);
console.log("混合获取年龄:" + age);

// 也能用在函数参数重命名上
function playGame(_ref2) {
    var x = _ref2.name;

    console.log("我在玩<" + x + ">");
};
playGame({ name: "战神3" });

// 找不到，则是 undefined
var _ref3 = [];
var canNotFind = _ref3[0];

console.log("can not find 的值:" + canNotFind);
var _ref4 = [];
var _ref4$ = _ref4[0];
var defaultName = _ref4$ === undefined ? "da宗熊" : _ref4$;

console.log("设置默认值:" + defaultName);

function getRectCenterPoint(_ref5) {
    var _ref5$x = _ref5.x;
    var x = _ref5$x === undefined ? 0 : _ref5$x;
    var _ref5$y = _ref5.y;
    var y = _ref5$y === undefined ? 0 : _ref5$y;

    console.log("中心坐标:(x: " + x / 2 + ", y: " + y / 2 + ")");
};
getRectCenterPoint({});
getRectCenterPoint({ x: 20, y: 30 });

function getRectArea(width) {
    var height = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

    console.log("方形的面积是:" + (width || 0) * height);
};
getRectArea();
getRectArea(10);

function getCircleData(_ref6) {
    var _ref6$x = _ref6.x;
    var x = _ref6$x === undefined ? 0 : _ref6$x;
    var _ref6$y = _ref6.y;
    var y = _ref6$y === undefined ? 0 : _ref6$y;
    var r = arguments.length <= 1 || arguments[1] === undefined ? 50 : arguments[1];

    console.log("中心是:" + x + " " + y + " 半径:" + r);
};
getCircleData({}, 40);

// 默认第 3 个参数，是个对象，其中，对象里有 option 的默认值，为false
function divide(a, b) {
    var _ref7 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref7$option = _ref7.option;
    var option = _ref7$option === undefined ? false : _ref7$option;

    console.log(arguments, option);
}
divide(1, 2, {});