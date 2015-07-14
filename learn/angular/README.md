# angular.js 学习总结

这周忽然要做果盘的开放平台后台，因为整个后台，都使用angular.js开发，所以，接触了一下。总的来说，angular.js表现得很强大，无论是业务逻辑，还是UI控制，都有着自己独特的一面。

但不能否认的，它有着自己的缺点：

 1. 难以调试，所有BUG，都被它封装了，经验少的人，难以从中得到有效的错误信息
 2. 于jQuery结合使用，有着很神奇的，不算是bug的bug、
 3.  它的$http板块，并不能很好的满足业务的需求，而且 error 回调，神烦


## 模块

angular.js通过module来控制某个业务的展示:

``` javascript
var app = angular.module("app", [/*依赖的板块*/]);
// 业务中，常用的板块是路由: ngRoute
```

在页面中，使用module，可这样:

``` html
<body>
	<section ng-app="app">
		......
	</section>
</body>
```

吐槽下：
为什么声明是 angular.module ，而对应的 directive，却是 ng-app ？？？？

一个页面，可以拥有多个 ng-app 模块，它们分别代表着独立的应用【反正一个模块，我理解为一个应用，就是个名字，不要在意这些细节】

## 控制器

有了module，就需要有相关的逻辑控制:

``` javascript
var ctrl1 = app.controller("ctrl1", ["$scope", function($scope){
	// 因为担心压缩的问题，一般我会使用数组形式编写控制器
}]);

// 或:

var ctrl2 = app.controller("ctrl2", function($scope){
	// angular.js根据参数名，自己完成注入
});

// 或:

var ctrl3 = function($scope){
	// 通过函数的 $inject 属性，完成注入
};
ctrl3.$inject = ["$scope"];
```

而controller，需要依附于 module 或 父级的 controller 而存在:

``` html
<section ng-app="app">

	<div ng-controller="ctrl1">
		..内容..
		<div ng-controller="ctrl2">
			..内容2..
		</div>
	</div>

	<div ng-controller="ctrl3">
		..内容3..
	</div>
	
</section>
```

当然，ng-app 和 ng-controller 可以放在同一个元素的属性内。

PS：
controller 结构上，有嵌套关系时，就会产生 父/子/兄弟controller 的概念。
对应的事件发布调用，也不尽一样:
``` javascript
$scope.$emit();	// 往父亲发送
$scope.$broadcast();	// 往孩子发送

$scope.$on();	// 监听事件
```
兄弟没人权！！


## 路由

这次的业务，很多的地方，都使用了ngRoute【需额外引用脚本的说..】
它有3个主要的成员，分别是 \$route， \$routeParams， \$routeProvider

一个路由的配置，依附在 module 层上:

``` javascript
app.config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/index", {
		templateUrl: './tmp/index.html', // 使用模板的路径
		controller: 'index' // 使用的控制器
	}).when("/user/:id", {
		template: '模板{{id}}', // 模板的字符串，这里定义了参数 :id，可通过 $routeParams.id 访问
		controller: 'user'
	}).otherwise({
		redirectTo: "/index" // 重定向到首页
	});
}]);
```

\$route 保存着路由的配置，和当前路由的信息，一般很少用。
\$routeParams能获取当前页面，路由配置中的参数:
```javascript
var user = app.controller("user", function($scope, $routeParams){
	console.log($routeParams.id); // 获取 /user/:id 的信息
});
```

## directive 指令

angular中，有很多指令，常用的，有:

 - ng-show: 是否显示 ng-show="isShow"
 - ng-model: 双向绑定 ng-model="varXX"
 - ng-class: 类名控制 ng-class="{active: isActive, hide: !isActive}"
 - ng-href: href的另类写法，防止错误的访问
 - ng-repeat: 遍历数组，ng-repeat="item in list"
 - ng-selected: 是否选中
 - ng-click: 点击事件

其它的，自己看文档去！


## service

service是控制器的服务，常用的服务有:

### \$scope
核心服务，此服务下的值，会绑定到 controller 对应的模板中。
如:
```
$scope.name = "da棕熊";
====>绑定
<p>{{name}}</p>
```
也可用监听某些属性的变化:
```
$scope.$watch("name", function(nowValue, oldValue){});
```
或者发布、监听事件:
```
$scope.$on("event1", function(e, data1, data2){});

// 往父层发布事件
$scope.$emit("event2", 1, 2);
// 往子层发布事件
$scope.$broadcast("event2", 1, 2);
```
当\$scope的属性，发生改变时，一般会自己触发属性和模板的双向绑定操作。

PS:
当使用jQuery的ajax功能时，angular就是个坑，ajax之后的，数据，并不会产生双向绑定的效果:
```
$scope.name = 1;
$.get("xx.json", function(data){
	$scope.name = 2; // 界面上，并不会立刻更新 name 的值
});
```
需要手动调用 angular 的服务，再次触发双向绑定的效果。如 $timeout

### \$timeout和\$interval

其实就是window.setTimeout和window.setInterval的angular版本的写法。用法一样，但是，前者，会绑定了angular的双向绑定更新操作。

推荐在angular中，使用前者。


### \$http

异步请求的服务:
```
$http({
	url: "xx.json",
	method: "GET",
	params: "a=1&b=2"
}).success(function(data){}).error(function(data){});
```
类似于jQuery，但是，很明显的，功能不够jQuery强大，而且，有着明显的BUG。

对于post请求，如果带上数据的，必须以以下形式编写:
```
\$http.post("xx.json", {});
```
不然，数据可能不被后端所承认

对于get请求，最好这样编写:
```
$http({
	url: "xx.json",
	method: "GET",
	params: "不要使用对象.."
});
```


# 最后

其它的，因为不常用这次就不写了。

未完，待续..

 