console.log("解构赋值:");

var [a, b] = [1, 2];
[a, b] = [b, a];
console.log("a == 2:" + (a == 2));
console.log("b == 1:" + (b == 1));

var {bar, foo} = { bar: "bar", foo: "foo" };
console.log("bar:" + bar);
console.log("foo:" + foo);

var {bar: bar2, foo: foo2} = { bar: "bar2", foo: "foo2" };
console.log("bar2:" + bar2);
console.log("foo2:" + foo2);

var { person: { name }, age } = {
    person: {
        name: "da宗熊"
    },
    age: 12
};
console.log("深入获取名字:" + name);
console.log("混合获取年龄:" + age);


// 也能用在函数参数重命名上
function playGame({name: x}){
    console.log("我在玩<"+ x +">");
};
playGame({ name: "战神3" });


// 找不到，则是 undefined
var [canNotFind] = [];
console.log("can not find 的值:" + canNotFind);
var [defaultName = "da宗熊"] = [];
console.log("设置默认值:" + defaultName);

function getRectCenterPoint({x = 0, y = 0}){
    console.log(`中心坐标:(x: ${x/2}, y: ${y/2})`);
};
getRectCenterPoint({});
getRectCenterPoint({x: 20, y: 30});

function getRectArea(width, height = 10){
    console.log(`方形的面积是:${(width || 0) * height}`);
};
getRectArea();
getRectArea(10);


function getCircleData({x = 0, y = 0}, r = 50){
    console.log("中心是:" + x + " " + y + " 半径:" + r);
};
getCircleData({}, 40);

// 默认第 3 个参数，是个对象，其中，对象里有 option 的默认值，为false
function divide(a, b, { option = false } = {}) {
    console.log(arguments, option);
}
divide(1, 2, {});
