"use strict";
var util = require("util");
var postcss = require("postcss");

// 声明一个属性
var decl = postcss.decl({prop: "color", value: "#000"});
console.log(decl.parent);
console.log(decl.source);

// 复制节点
decl = postcss.decl({prop: "transform", value: "scale(2)"});
var prefix = decl.clone({prop: "-moz-" + decl.prop});
console.log(prefix.toString());
return;

// 把样式转为对象
var root1 = postcss.parse("p{font-size:12px;color:#fff;}");

// console.log(util.inspect(root1, true));
// console.log(root1.toResult().css);


// 创建插件
var remove = postcss.plugin("postcss-remove", function(opts){
    var filter = opts && opts.prop || "z-index";
    return function(css, result){
        // 在 css 中，遍历某个属性
        css.walkDecls(filter, function(decl){
            // decl 是被找出的那个属性
            // decl.prop 是属性
            // decl.value 是属性的值
            // console.log(decl);
            decl.remove();
        });
    };
});

// postcss().use(remove);  // 使用默认参数
// var root2 = postcss([remove({prop: "color"})]);
// 下面两行，与上面1行等价
var root2 = postcss();
root2.use(remove);
// 插件的名字 和 postcss 的版本
console.log(
    root2.plugins[0].postcssPlugin,
    root2.plugins[0].postcssVersion
);

// root2.process('p{color:#fff;width:100px;}')  // 莫名奇妙的操作..
// process 是加工 该 css
console.log(root2.process('p{color:#fff;width:100px;z-index:100;}').css);
