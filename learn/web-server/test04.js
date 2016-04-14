// 虽然继承worker，但是，无法接收消息
this.addEventListener("message", function(){
    console.log(arguments);
});


// serviceWorker 在关闭浏览器之前，是不会重新请求这份文件的，如果不请求文件，则不会更新版本号，缓存的内容，则不会更变
var CacheName = "test04_" + 2;

// event 有两个方法
// event.waitUntil(promise);
// event.skipWaiting(); 终止当前等待
this.addEventListener("install", function(event){
    var resourcePromise = caches.open(CacheName).then(function(cache){
        // 资源寻址，在当前目录的说..
        return cache.addAll([
            // "./test04/test04.css",   // 这个文件，在下面 fetch 事件中，进行拦截
            "/flamingo/learn/web-server/test04.html",
            "/flamingo/learn/web-server/test04/test04.js"
        ]);
    });
    event.waitUntil(resourcePromise);
});


// 用于 activate 状态中，所有客户端，在刷新前，缓存即可生效
// self.clients.claim();
this.addEventListener("activate", function(event){
    // 清空旧的缓存数据
    var clearPromise = caches.keys().then(function(list){
        return Promise.all(list.map(function(name){
            if (name != CacheName) {
                return caches.delete(name);
            }
        }));
    });
    event.waitUntil(clearPromise);
    // self.clients.claim();
});


// 外部拉取脚本
this.addEventListener("fetch", function(event){
    var request = event.request;
    event.respondWith(
        caches.match(request).then(function(response){
            if (response) {
                return response;
            }
            return fetch(request.clone()).then(function(response){
                return caches.open(CacheName).then(function(cache){
                    return cache.put(request, response.clone()).then(function(){
                        return response;
                    });
                });
            }).catch(function(){
                var response = new Response("can not find~", {status: 404});
                return response;
            });
        })
    );
});
