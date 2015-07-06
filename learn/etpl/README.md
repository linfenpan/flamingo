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

## 变量

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

## 函数

第二部，也是最重要的，莫属于解析模板的语句了。

因为模板，经常会是某个元素的innerHTML，而它的换行[呃，我不擅长控制]，一般我会替换掉:
``` html
<!-- 如有模板 -->
<script id="template" type="html/template">
	我叫:<%= name %> <br/>
	<% if(type == 1){ %>
		状态: <%= type %>
	<% } %>
</script>

<script>
	var html = template.innerHTML;
	// 替换掉换行:
	html = html.replace(/\s/g, " ");
</script>
```

考虑到， '**xx内容**<% 表达式 %>'   这种形式比较好用正则匹配，所以，把 '**前面内容**<%表达式%>**后面内容**' 的 '前面' 和 '后面' 部分去掉：

``` javascript
// resList 是最终的结果，rightContent是‘后面’部分的内容
var resList = [], rightContent = '';

html = html.replace(/(.*?)(<%.*%>)(.*)/g, function(str, left, center, right){
	rightContent = right;
	resList.push(left);
	console.log("left:%s center:%s right:%s", left, center, right);
	return center;
});
// 正则匹配的内容将是:
// left: 我叫:
// center: <%= name %> <br/>	<% if(type == 1){ %>		状态: <%= type %>	<% }%>
// right: 
```

剩下 ‘center’ 的内容，都符合 '**xx内容**<%表达式%>' 的格式，所以，使用正则，编译剩下的内容:

``` javascript
var __TMP_LIST__ = '__TMP_LIST__',
	__TMP_DATA__ = '__TMP_DATA__';
	
// 需要编译的动态函数内容
var fnStr = '';

// 开始匹配表达式，匹配 'xxx<% expr %>'
html.replace(/(.*?)<%(.*?)%>/g, function(str, html, exp){
	console.log("html:%s exp:%s", html, exp);
	// html内容
	fnStr += __TMP_LIST__ + ".push('" + quote(html) + "');";
	
	// 表达式内容，带等号，取值，不带，则是动态函数的逻辑控制部分
	if(exp.indexOf("=") === 0){
		fnStr += __TMP_LIST__ + ".push("+ exp.slice(1) +");";
	}else{
		fnStr += exp;
	}
});
```

## 生成动态函数

准备工作都完成了，剩下最后一步：

``` javascript

// 构建编译的动态函数
var fn = new Function(__TMP_DATA__, __TMP_LIST__, fnStr);

// 如果结果列表没有数据，则没有需要编译的内容
if(resList.length > 0){
	// 把需要编译的数据，结果列表，传入动态函数
	fn(data, resList);
	// 不要漏了最后一个小尾巴，上面去除 ‘前’ 和 ‘后’部分，留下的
	resList.push(rightContent);
	console.log(resList.join(""));
}else{
	console.log(html);
}
```

一个简答的模板编译函数，已经大功告成了~。

------

# 最后

最除版本，肯定有很多BUG，不过思路应该没有错的。还有挺多拓展的，像转义，错误检测什么的，配置定界符什么的，都可以尝试，这里就不再详细介绍了。

# 完整代码

``` html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title></title>
</head>
<body>

	<div id="content"></div>

</body>
<script id="template" type="html/template">
	<h1><%= title %></h1>
	<% if(type == 1){ %> 
		<p  class="123">状态: <%= status %></p>
	<%}%> xx..
</script>
<script>
function trim(str){
	return str.replace(/^\s*|\s*$/g, "");
}
// 转移 ' 和 "
function quote(str){
	return str.replace(/('|")/g, '\\$1');
}


var html = template.innerHTML
	data = {title: "da宗熊", type: 1, status: "很好"};

// 动态函数的连个参数
var __TMP_DATA__ = '__TMP_DATA__', __TMP_LIST__ = '__TMP_LIST__';
// 结果列表，动态函数字符串
var resList = [], fnStr = '', rightContent = '';


// 去除换行
html = html.replace(/\s/g, " ");

// 因为 'xx内容<% 表达式 %>' 这种形式比较好用正则匹配，所以，把 '前面内容<%表达式%>后面内容' 的 '前面' 和 '后面' 去掉
html = html.replace(/(.*?)(<%.*%>)(.*)/g, function(str, left, center, right){
	rightContent = right;
	resList.push(left);
	console.log("left:%s center:%s right:%s", left, center, right);
	return center;
});

// 开始匹配表达式
html.replace(/(.*?)<%(.*?)%>/g, function(str, html, exp){
	console.log("html:%s exp:%s", html, exp);
	// html内容
	fnStr += __TMP_LIST__ + ".push('" + quote(html) + "');";
	
	// 表达式内容
	if(exp.indexOf("=") === 0){
		fnStr += __TMP_LIST__ + ".push("+ exp.slice(1) +");";
	}else{
		fnStr += exp;
	}
});

// 构建变量定义
var varStatement = "";
for(var name in data){
	varStatement += 'var ' + name + '=__TMP_DATA__.' + name + ';';
}
fnStr = varStatement + fnStr;

// 构建编译函数
var fn = new Function(__TMP_DATA__, __TMP_LIST__, fnStr);

if(resList.length > 0){
	fn(data, resList);
	resList.push(rightContent);
	console.log(resList.join(""));
}else{
	console.log(html);
}
</script>
</html>
```
