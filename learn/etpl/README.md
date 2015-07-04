# 编写自己的模板解析器

因为最近在研究artTemplate，ejs，baaiduTemplate等模板，所以，一时兴起，自己也写了个简单的模板解析器。

一个最基本的模板解析器，需要有什么功能呢？

 1. 读取变量值
 2. 解析模板语句

按照这个思路，我们编写一个简单的解析器，需求如下:

 1. 读值: <%= 变量名 %>
 2. 语句支持: <% if( type == 1 ){ %> good! <%}%>

总体来说，就是如果模板如下:
``` html
我叫:<%= name %> <br/>
<% if(type == 1){ %>
	状态: <%= type %>
<% } %>
```

如果有数据{name: 'da宗熊' type: 1}，则需要输出：

``` html
我叫: da宗熊
状态: good!
```
按照上面需求，我们需要做什么呢？因为考虑到要在模板内执行脚本，所以，最直接的办法， 就是把模板翻译为 javascript。

------

# 动手咧

观看了上面几个模板引擎的代码，主要思路莫过于：

 1. 通过正则匹配，找出 '<%...%>' 的模块，进行处理
 2. 把所有匹配出来的内容，拼接为 字符串
 3. 然后通过 new Function 生成可执行的函数

但3者，对于 <%= 变量  %> 的取值，有着不同的处理:

ejs通过with语句，给变量指定了变量的访问上下文。

artTemplate和baiduTemplate通过遍历传入的变量，生成变量声明语句，从而达到给变量赋值的效果。

考虑到with语句的低效，这里采取了 第二种 形式。

``` javascript
// 如有传入的变量参数为:data
var data = {
	name: 'da宗熊', type: 1
};

// 那模板中，遍历变量，生成声明语句
var varStatement = '';
for(var name in data){
	varStatement += 'var ' + name +' = data.' + name + ';';
}
// varStatement = 'var name = data.name;var type = data.type;';
```

那
