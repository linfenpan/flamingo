# 跨多个父子域通讯

基于jquery跨父子域进行通讯[如果有jsonp协议，强烈要求使用，更加方便简洁]。

如本地有页面: http://123.test.com/index.html
它需要访问测试域名的数据: http://xx.123.test.com/

1、页面引入jquery和crossRequest脚本

2、把服务器文件夹的页面，放置到 http://xx.123.test.com/ 域名下的任意目录
如：http://xx.123.test.com/cross-domain.html

3、调用脚本:

``` javascript
var cr = crossRequest({
	domain: "test.com",
	url: "http://xx.123.test.com/cross-domain.html"
});

// 脚本执行成功后，即可调用一下方法
// 用法与jquery一致

cr.get/cr.post/cr.ajax  
```

如果需要跨多个域名，url参数请传入数组。

如何方便使用，可参考index.html里的方法。通过 isDebug 参数，控制是否跨域请求。

本例子，请部署到 http://test.100bt.com/ 域名下，方可看到效果。
