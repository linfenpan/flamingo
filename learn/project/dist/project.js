/*! By da宗熊 2015-10-10 */
;(function(window){
var head = document.documentElement || document.getElementsByTagName("head")[0];
function loadScript(src, callback){
    var script = document.createElement("script");
    script.async = true;

    // 如果支持 onload
    if("onload" in script){
        script.onload = onload;
        script.onerror = function(){
            console.log("加载失败:" + src);
            onload(true);
        }
    }else{
        script.onreadystatechange = function(){
            if(/loaded|complete/.test(script.readyState)){
                onload();
            }
        }
    };

    script.src = src;
    head.appendChild(script);

    function onload(error){
        script.onload = script.onerror = script.onreadystatechange = null;
        head.removeChild(script);
        script = null;

        callback(error, src);
    };

};

// 异步请求封装
var ajax, newAjax;
if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
    newAjax = function(){
        return new XMLHttpRequest()
    };
}else{// code for IE6, IE5
    newAjax = function(){
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
};

// 只发送 get 请求
ajax = function(url, callback){
    var xmlHttp = newAjax();
    xmlHttp.onreadystatechange = function(){
        // 4 = "loaded"
        // 200 = "OK"
        if(xmlHttp.readyState == 4){
            xmlHttp.onreadystatechange = null;
            if(xmlHttp.status == 200 || xmlHttp.status == 302){
                console.log("加载成功");
                callback && callback(false, url, this.responseText, this);
            }else{
                console.log("加载失败..");
                callback && callback(true);
            }
        }
    };
    // 第 3 个参数，代表：是否异步
    xmlHttp.open("GET", url, true);
    // 发送数据
    xmlHttp.send(null);
};

// 路径解析
path = {};
// 路径格式化
path.normal = function(p){
    // 把 ./a/./b//c/d/../e/ ==> ./a//b//c/d/../e/
    p = p.replace(/\/\.\//g, "\/\/");

    // 把 ./a//b/c/d/../e/ ==> ./a/b/c/d/../e/
    p = p.replace(/([^:])\/{2,}/g, "$1\/");

    // 把 ./a/b/c/d/../e/ ==> ./a/b/c/e/
    p = p.replace(/[^/]+\/\.\.\/([^/]*)/g, "$1");

    return p;
};

// 是否绝对路径, ftp:// 或 http:// ，不过 // 这种不知道算不算呢?
path.isAbsolute = function(p){
    return /:\/\//.test(p);
};

// 路径合并
path.join = function(){
    var p = [].join.call(arguments, "\/");
    return this.normal(p);
};

// 目录，http://www.100bt.com 这样的，会有BUG，不过，不理了
path.dir = function(p){
    return p.replace(/(.*\/).*$/, "$1");
};

// 后缀名
path.ext = function(p){
    return p.replace(/.*\.(.*)$/, "$1");
};

// 类型查询
var typeToString = Object.prototype.toString;
function queryType(o){
    return typeToString.call(o).slice(1, -1).split(" ")[1].toLowerCase();
};

// 获取函数内的字符串
function queryFnInnerText(fn){
    var str = fn.toString();
    // 为什么 是 /*! */ 这种注释呢? 因为压缩的时候，可以剔除
    return str.slice(str.indexOf("/*!") + 3, str.lastIndexOf("*/")).replace(/^[\n\r]*|[\n\r]*$/g, "");
};

// 数据的复制
function extend(){
    var obj = arguments[0] || {}, max = arguments.length - 1, index = 1;
    var item;
    do{
        item = arguments[index] || {};
        for(var i in item){
            if(item.hasOwnProperty(i)){
                obj[i] = item[i];
            }
        }
        index++;
    }while(index < max);
    return obj;
};

// 字符串转 json
function toJSON(str){
    return window.JSON ? JSON.parse(str) : (new Function("return "+ str))();
};

// 简单的模板方法
function Format(data){
    var str = "";
    for(var i in data){
        str += "var " + i + " = \"" + data[i].toString().replace(/(")/g, "\$1") + "\";\n"
    };
    str += 'return str.replace(/\\${([^}]*)}/g, function(str, key){\nreturn eval(key) || "";\n});\n';
    return new Function("str", str);
};

var data = {basePath: null}; // 模板数据, basePath: "/"
var loaded = {};            // 加载完成的脚本
var loadingScripts = [];    // 正在加载中的脚本
var basePath = "";

// 项目设置
if(window.Project){
    extend(data, window.Project.path || {});
    extend(loaded, window.Project.other || {});
};

// 计算基础路径
;(function(doc){
    if(data.basePath){
        basePath = data.basePath;
        if(!path.isAbsolute(basePath)){
            var link = document.createElement("a");
            link.setAttribute("href", basePath);
            basePath = link.hasAttribute ? link.href : link.getAttribute("href", 4);
        }
    }else{
        var script = doc.getElementById("projectnode") || doc.scripts[0];
        var i = 0;
        while(i++, !script.src){
            script = doc.scripts[i];
        }
        // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
        basePath = path.dir(script.hasAttribute ? script.src : script.getAttribute("src", 4));
    }
})(window.document);

// 加载配置
// p 是路径
// next 是下一步的函数
// ext 是当前路径的后缀
var requireMap = {
    "js": function(p, next, ext){
        loadScript(p, function(error, url){
            if(error !== true){
                joinScriptAndPath(url, function(){
                    next(loaded[p]);
                });
            }
        });
    },
    "default": function(p, next, ext){
        ajax(p, function(error, url, text){
            if(error !== true){
                next(ext == "json" ? toJSON(text) : text);
            }
        });
    }
};

// 加载器
var loader = {};
// 文件加载
loader.require = function(filePath, callback){
    filePath = concatFilePath(filePath);
    // 防止重复加载
    if(!loaded[filePath]){
        var ext = path.ext(filePath), fn = requireMap[ext] || requireMap["default"];
        fn(filePath, function(cnt){
            loaded[filePath] = cnt;
            callback && callback(cnt);
        }, ext);
    }else{
        callback && callback(loaded[filePath]);
    }
};

// 添加文件 处理器
loader.addTypeProcesser = function(type, fn){
    requireMap[type] = queryType(fn) === "function" ? fn : (requireMap[fn] || requireMap["default"]);
};

// 加入 脚本盏中
// 一个被 require 的脚本中，必须、仅且有一个 没有 名字的 define，作为程序的入口
loader.define = function(name, fn){
    if(queryType(name) === "function"){
        loadingScripts.push(name);
    }else{
        loaded[name] = fn;
    }
};

// 把脚本地址 和 对应的函数，接纳起来
function joinScriptAndPath(url, callback){
    var fn = loaded[url] = loadingScripts.pop();
    var dir = path.dir(url);
    // 对文件进行解析
    if(fn.length < 3){
        loaded[url] = queryFnInnerText(fn);
        callback && callback();
    }else{
        parseBeforeExecute(dir, fn, function(){
            var innerModule = {exports: {}};
            loaded[url](createInnerRequire(url), innerModule, innerModule.exports);
            loaded[url] = innerModule.exports;
            callback && callback();
        });
    }
};

// 文件执行前，对路径进行预解析
function parseBeforeExecute(dir, fn, callback){
    var str = fn.toString(), reg = /\brequire\s*\(([^)]*)\)/g;
    var res, readyCount = 0;
    while(res = reg.exec(str), res){
        // console.log(res[0], res[1]);
        var url = res[1];
        // 如果是 require("data.json")，进行加载
        // 如果是 require("data.json", function(){})，则忽略，等待异步加载
        if(/["']\s*,/.test(url)){
            // 忽略
        }else{
            // 计算器在这里加减，是因为全部是异步的时候，回调的 ready 没有执行的说
            url = url.replace(/"|'/g, "");
            if(!loaded[url]){
                readyCount++;
                loader.require(concatFilePath(url, dir), function(){
                    readyCount--;
                    ready();
                });
            }
        }
    };
    // 计算器为 0，执行回调
    function ready(){
        if(readyCount <= 0){
            callback && callback();
        }
    };
    ready();
};

// define 使用 的 require
// 内置的 require，需要修复一次路径
function createInnerRequire(url){
    var dir = path.dir(url);
    return function innerRequire(url, callback){
        // 名字 或 绝对路径
        var cnt = loaded[url] || loaded[concatFilePath(url, dir)];
        if(cnt){
            callback && callback(cnt);
            return cnt;
        }else{
            loader.require(url, callback);
        }
    };
};

// 合并文件路径
// 让 文件 路径，支持模板计算方法
var pathFormat = Format(data);
function concatFilePath(p, base){
    // 路径模版化
    p = pathFormat(p);
    if(path.isAbsolute(p)){
        return p;
    }else{
        return path.join(base || basePath, p);
    }
};

window.require = loader.require;
window.define = loader.define;
window.require.addTypeProcesser = loader.addTypeProcesser;
window.require.ajax = ajax;

})(window);