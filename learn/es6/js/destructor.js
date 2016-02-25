"use strict";

console.log("解构赋值:");

var a = 1;
var b = 2;

console.log("a == 1:" + (a == 1));
console.log("b == 2:" + (b == 2));

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
function playGame(_ref) {
    var x = _ref.name;

    console.log("我在玩<" + x + ">");
};
playGame({ name: "战神3" });

// 找不到，则是 undefined
var _ref2 = [];
var canNotFind = _ref2[0];

console.log("can not find 的值:" + canNotFind);
var _ref3 = [];
var _ref3$ = _ref3[0];
var defaultName = _ref3$ === undefined ? "da宗熊" : _ref3$;

console.log("设置默认值:" + defaultName);

function getRectCenterPoint(_ref4) {
    var _ref4$x = _ref4.x;
    var x = _ref4$x === undefined ? 0 : _ref4$x;
    var _ref4$y = _ref4.y;
    var y = _ref4$y === undefined ? 0 : _ref4$y;

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