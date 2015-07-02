/**
 * @author: da宗熊
 * @date: 2015-07-02
 * @version: 1.0.1
 * @desc: 简单的跨父子域封装
 * @rely: ["jquery"]
 * @param: crossRequest({url: "跨域的中间链接", domain: "当前与中间链接的共同父域", method: ["需要跨域的一些方法"]});
 * @example:
 *      var cr = crossRequest(); cr.get("xxx.json", function(data){});
 * @feature:
 *  现在只能跨单个域名，之后版本，支持多域名吧
 */
var crossRequest = (function(window, $){
    if(window.crossRequest){return crossRequest;}

    var DEFAULT_CONFIG = {
        // domain: '100bt.com',
        // url: 'http://qq.100bt.com/common/cross-domain.jsp' || ["", ""],
        method: ['get', 'post', 'ajax', 'getJSON']
    };
    var FRAME_ID = 'cross-request-frame-',
        FRAME = '<iframe id="#{id}" src="#{src}" style="display:none;"></iframe>';

    // ifarme的ID
    var id = 1;
    function getId(){
        return FRAME_ID + id++;
    }
    // 格式化字符串
    function format(str, data){
        return str.replace(/#{([^}]*)}/g, function(s, key){
            return data[key];
        });
    }
    // 根据链接，获取domain
    function getDomain(url){
        var arr = /^(?:http|ftp):\/\/([^/]*)/.exec(url || "");
        return arr ? arr[1] : "";
    }

    // 跨域的请求
    var request = {
        // 改写父子domain
        // 生成iframe
        // 监听iframe，并插入body
        init: function(config){
            // 必须要提供域名和跨域中间链接
            if(!config.url || !config.domain){
                throw('使用crossRequest, domain 和 url 必须设置');
                return;
            };
            this.$body = $("body");
            // iframe对应$.Deferred对象的Map
            this.frameDefMap = {};
            var cf = this.config = $.extend({}, DEFAULT_CONFIG, config || {});

            // 改写父域
            var domain = cf.domain;
            if(domain){
                document.domain = domain;
            }

            // 多个链接，对应多个iframe
            if("string" === typeof cf.url){
                cf.url = [cf.url];
            }
            for(var i = cf.url.length; i--; ){
                this.createIframe(cf.url[i]);
            }

            // 生成get/post等方法
            this.createCrossMethod(cf.method);

            // 清空某些方法，防止错误使用
            this.clean();
            return this;
        },
        // 获取 domain 值
        getDomain: getDomain,
        // 根据链接，生成iframe，以及iframe对应的 $.Deferred 对象
        // $.Deferred 对象存在 this.frameDefMap 中，其对应的 key 为 链接的 domain
        createIframe: function(url){
            // 1. 初始化iframe
            // 2. 生成iframe对应的 $.Deferred 对象
            // 3. 监听iframe事件
            // 4. body中插入ifarme
            // 1
            var $iframe = format(FRAME, {
                id: getId(),
                src: url
            });
            $iframe = $($iframe);

            // 2
            var domain = getDomain(url);
            var deferred = this.frameDefMap[domain] = $.Deferred();

            // 3
            $iframe.on("load", function(e){
                var frame = e.currentTarget,
                    win = frame.contentWindow;
                // 判定有没有约定的某个变量，有，则成功，没有，则失败了..
                if(1 == 1){
                    deferred.resolve(win, win.$);
                }else{

                }
            });
            // 4
            this.$body.append($iframe);
        },
        // 根据config.method属性，生成对应需要跨域的方法
        createCrossMethod: function(mlist){
            // 使用动态生成，减少闭包
            var mlist = mlist || ["get", "post"], fn;
            for(var i = mlist.length; i-- ; ){
                fn = mlist[i];
                // 根据不同链接，寻找不同的 domain
                this[fn] = new Function('\
                  var arg = arguments;\
                  var url = arg[0], domain = this.getDomain(url);\
                  this.frameDefMap[domain].done(function(win, $){\
                      $.'+ fn +'.apply($, arg)\
                  });\
                ');
            }
        },
        // 清空不必要的数据
        clean: function(){
            this.$body = this.$iframe = this.init = this.createCrossMethod = this.clean = this.createIframe = null;
            delete this.init;
            delete this.createCrossMethod;
            delete this.createIframe;
            delete this.clean;
            delete this.$body;
            delete this.$iframe;
        }
    };

    // 委托一份request对象
    return function(cf){
        var fn = function(){};
        fn.prototype = request;
        fn = new fn();
        return fn.init(cf), fn;
    }
})(window, $);
