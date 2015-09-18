"use strict";
// 析构赋值

// var [a, b, c] = [1, 2, 3];   // 搓，玩不了

// 这种OK
var a = 1, b = 2;
var obj = {a, b};


// 这个声明跑得通
var fnc = (x) => {
    console.log(111);
}

fnc();

// 好用的 ... 展开，竟然也用不了
// console.log(Math.max(...[1, 2, 3]))


// 集合能用，那就说明 Map 也是可以用的
var s = new Set();
[1, 2, 3, 4, 5].map(x => s.add(x));
for(let i of s){
    console.log(i);
}


// 类
class Point{
    constructor(x, y){
        this.point = {x, y};
    }

    toString(){
        return "("+ this.piont.x + "," + this.point.y +")";
    }
}

// 类继承
class ColorPoint extends Point{
    constructor(x, y, color){
        super(x, y);    // 调用父类
        this.color = color;
    }
    toString(){
        return this.color + " " + super.toString(); // 调用父类
    }
}

// generator 函数
function* xx(){
    yield "hello";
    yield "world";
    return "end";
};
var hw = xx(), res = hw.next();
// generator函数，并不返回最终结果
// 而是返回 一个 遍历器
// hw.next() => {value: , done:}
// 遇到 done = true，则 结束这一次遍历
while(!res.done){
    console.log(res.value);
    res = hw.next();
}
console.log(res.value);
