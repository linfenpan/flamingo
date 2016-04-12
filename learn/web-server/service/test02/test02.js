// 添加 Cache.add, Cache.addAll 和 CacheStorage.match() 等支持
importScripts("../serviceworker-cache-polyfill.js");

var CACHE_VERSION = 1;
var CURRENT_CACHES = {
    prefetch: "prefetch-cache-v" + CACHE_VERSION
};


// 进行安装的事件，需要缓存的资源，需要在这里全部缓存下来
self.addEventListener("install", function(event){
    var now = Date.now();
    var urlsToPrefetch = [
        "./static/pre_text.txt",
        "./static/pre_fetched.html",
        "https://www.chromium.org/_/rsrc/1302286216006/config/customLogo.gif"
    ];

    console.log("缓存资源:", urlsToPrefetch);

    event.waitUntil(
        caches.open(CURRENT_CACHES.prefetch).then(function(cache){
            var cachePromises = urlsToPrefetch.map(function(urlToPrefetch){
                var url = new URL(urlToPrefetch, location.href);
                // 最大的目的，在于防止使用浏览器缓存版本
                url.search += (url.search ? "&" : "?") + "cache-bush=" + now;

                // 防止不支持 CORS
                var request = new Request(url, {mode: "no-cors"});

                return fetch(request).then(function(response){
                    if (response.status >= 400) {
                        throw new Error("request for" + urlToPrefetch + " failed with status" + response.status);
                    }

                    // 使用原始链接，作为 key，但是内容，绝对是最新的
                    return cache.put(urlToPrefetch, response);
                }).catch(function(error){
                    console.error("Not caching" + urlToPrefetch + " due to " + error);
                });
            });

            return Promise.all(cachePromises).then(function(){
                console.log("Pre-fetching complete.");
            });
        }).catch(function(error){
            console.error("Pre-fetching failed:", error);
        })
    );
});


// 可使用状态，做一些上一次缓存清理的操作
self.addEventListener("activate", function(event){
    var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key){
        return CURRENT_CACHES[key];
    });

    // 如果不在当前缓存列表，删除相关缓存
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if (expectedCacheNames.indexOf(cacheName) == -1) {
                        console.log("Deleting out of data cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});


// 拉取事件
// 决定是否使用缓存的，是在这里确立
self.addEventListener("fetch", function(event){
    console.log("正在读取的链接为:" + event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response){
            if (response) {
                console.log("在缓存中，找到资源:", response);
                return response;
            }

            console.log("没在缓存中，找到资源，尝试在网络中获取");

            return fetch(event.request).then(function(response){
                console.log("从网络中获取成功:", response);
                return response;
            }).catch(function(error){
                console.log("拉取失败:", error);
            });
        })
    );
});
