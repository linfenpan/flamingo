# 跨父子域通讯

虽然说，IE8+跨域可以使用CROS协议，但是，因为大家说，不怎么灵通，于是，走回了以前的老路，使用iframe进行跨域通许

引入例子中的crossRequest.js，把后端需要的文件，放置到相关的服务器上【记得改jquery的地址】

那在我们自己的页面中，只需要这样访问跨域的资源，则OK：
``` javascript
var cr = crossRequest({
	domain: "xxx.com",
	url: "刚刚放在后台的页面的路径"
});

cr.get/cr.post/cr.ajax  # 用法于jquery一致
```

