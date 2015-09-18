"use strict";
// 在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。
// 这在语法上，称为“暂时性死区”，简称 TDZ
var tmp;

if(true){
    tmp = "abc";    // OK
    console.log("赋值成功..\n");
}

// 但如果有 let，则坑爹咯
if(true){
    // TDZ 开始
    try{
        // 只要有 同名 的 let 对象，就不会找到外层的 var 变量
        // 当然咯，不同名，不会有这个限制
        tmp = 123;
    }catch(e){
        console.log("赋值报错了");
    }

    // TDZ 结束
    let tmp;
    tmp = "let赋值\n";
    console.log(tmp);
}


// 有些“死区”更加隐藏，不容易被人发现
// 好像 node4 暂时也不支持函数的 默认 参数的说..
// function bar(x, y = 2){
//     console.log("这个也是死区:", x, y);
// };
//
// try{
//     bar();
// }catch(e){
//     console.log("给x赋值失败了，因为y没有声明，属于死区范围");
// }
