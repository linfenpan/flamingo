# mock.js 数据模拟生成器

工作中，前端免不了需要和各种后台数据打交道。如果后端接口迟迟没提供，而又需要数据做展示或测试。而这时候，前端往往需要自己手动去模拟数据。

例如，有页面:

``` html
<div>
	<p>{{name}}</p>
	<p>年龄: {{age}}</p>
</div>
```
正常情况，前端通过 ajax 获取数据，并填充页面:
``` javascript
$.get("data.php", function(data){
	// data = {name: "da宗熊", age: 26}
	// 将数据填充进模板
});
```
但，如果后端并没写好 data.php 接口，而我们有着急想看效果，于是，在代码上进行改进:
``` javascript
var isDebug = true;
if(isDebug){
	var data = {name: "da宗熊", age: 26};
	// 将数据填充进模板
}else{
	$.get("data.php", function(data){
		// data = {name: "da宗熊", age: 26}
		// 将数据填充进模板
	});
}
```

起初看着还挺不错的，有变量 isDebug 控制是否进入调试。但深思，缺点却不少:

 1. 带来了额外的判断逻辑
 2. 模拟的数据呆板，不能很好的模拟各种情况
 3. 容易忽略异步数据，带来的一些问题


于是，前端s，就开始寻找各种数据模拟的工具，像 fiddler, node 等。

而今天介绍的mock.js，也是一款数据模拟的工具，但不需安装[一个脚本文件]，跟jQuery友好的集成，而且纯前端配置，功能总体还不赖。

## 简单数据模拟

只需一段简单的json文件，就能模拟比较友好的动态数据
``` javascript
var data = Mock.mock({
	"age|20-30": 30,
	"email|1": ["1@qq.com", "2@sina.com", "3@163.com"]
});
// ====>
{age: 29, email: "3@163.com"}
```
每次执行 Mock.mock，data的值，都会动态更变。

## 拦截ajax请求

它内置拦截了 jQuery 的ajax请求，但要注意咯，**一定要先引入 jQuery**，再引入 Mock.js。不然拦截会失败。

拦截支持 正则，也支持路径:
``` javascript
Mock.mock(/\.json/, {
	"code|1": [200, 300],
	"data": {
		"name": "@CNAME",
		"age|20-30": 30
	}
});
```
它拦截了所有后缀为 ".json" 的请求
``` javascript
$.get("x.json", function(data){
	console.log(data)
}, "json");

// ===> {code: 200, data:{age: 28, name: "袁青之"}}
```
其中 "@CNAME"是mock.js内置的数据占位符，能生成 中文名字。

PS：如果不是正则，而是字符串，那配置的字符串，需要和请求的链接，**完全一致**！！


# 最后

Mock.js 内置了强大的数据占位符，跟 jQuery, Zepto, KISSY 友好【已实现了这3者的数据拦截】。其中，更为强大的模拟、拓展方法，这里就不细说了。

参考资料：

> 官方网站： http://mockjs.com/

> Angular社区: http://www.angularjs.cn/A0I4

> github: https://github.com/nuysoft/Mock
