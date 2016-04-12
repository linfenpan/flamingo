

var CacheVersion = 1;
var CurrentCaches = {
    font: "font-cache-v" + CacheVersion
};


self.addEventListener("activate", function(event){
    // // 删除不在当前版本的缓存
    // var expectedCacheNames = Object.keys(CurrentCaches).map(function(key){
    //     return CurrentCaches[key];
    // });
    //
    // event.waitUntil(caches.keys().then(function(cacheNames){
    //     return Promise.all(cacheNames.map(function(cacheName){
    //         if (expectedCacheNames.indexOf(cacheName) == -1) {
    //             // 删除过期缓存
    //             return caches.delete(cacheName);
    //         }
    //     }));
    // }));

    // 当前缓存列表
    var curentCacheList = Object.keys(CurrentCaches).map(function(key){
        return CurrentCaches[key];
    });

    // 不在当前缓存列表的，都是过期的缓存，都需要删除掉
    event.waitUntil(
        caches.keys().then(function(cacheNameList){
            var promiseList = cacheNameList.map(function(name){
                if (curentCacheList.indexOf(name) == -1) {
                    return caches.delete(name);
                }
            });

            return Promise.all(promiseList);
        })
    );
});


// 判断，是否需要拉去缓存
self.addEventListener("fetch", function(event){
    console.log("请求:" + event.request.url);

    event.respondWith(
        caches.open(CurrentCaches.font).then(function(cache){
            return cache.match(event.request).then(function(response){
                if (response) {
                    return response;
                }

                console.log("请求'%s'不在列表，从网络中获取", event.request.url);
                // fetch 和 cache.put 都会消耗掉 request 对象，所以，使用request对象时，需要调用 close 方法
                // (see https://fetch.spec.whatwg.org/#dom-request-clone)
                return fetch(event.request.clone()).then(function(response){
                    if (response.status < 400 && response.headers.has("content-type")) {
                        cache.put(event.request, response.clone());
                    } else {
                        console.log("缓存失败...");
                    }
                });
            }).catch(function(error){
                // 捕获 match 和 fetch 抛出的错误
                throw error;
            });
        })
    );
});
