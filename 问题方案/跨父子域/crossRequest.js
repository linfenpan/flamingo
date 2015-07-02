/**
 * @author: da宗熊
 * @date: 2015-07-02
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
        domain: '100bt.com',
        url: 'http://qq.100bt.com/common/cross-domain.jsp',
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

    // 跨域的请求
    var request = {
        // 改写父子domain
        // 生成iframe
        // 监听iframe，并插入body
        init: function(config){
            this.$body = $("body");
            // iframe初始化后的Deferred对象
            this.frameDef = $.Deferred();
            var cf = this.config = $.extend({}, DEFAULT_CONFIG, config || {});

            // 改写父域
            var domain = cf.domain;
            if(domain){
                document.domain = domain;
            }

            // 1. 初始化iframe
            // 2. 监听iframe事件
            // 3. 插入ifarme
            // 1
            var $iframe = format(FRAME, {
                id: getId(),
                src: cf.url
            });
            $iframe = $($iframe);
            // 2
            $iframe.on("load", $.proxy(function(e){
                var frame = e.currentTarget,
                    win = frame.contentWindow;
                // 判定有没有约定的某个变量，有，则成功，没有，则失败了..
                if(1 == 1){
                    this.frameDef.resolve(win, win.$);
                }else{

                }
            }, this));
            // 3
            this.$body.append($iframe);
            this.$iframe = $iframe;

            // 生成get/post等方法
            this.createCrossMethod(cf.method);

            // 清空某些方法，防止错误使用
            this.clean();
            return this;
        },
        // 根据config.method属性，生成对应需要跨域的方法
        createCrossMethod: function(mlist){
            // 使用动态生成，减少闭包
            var mlist = mlist || ["get", "post"], fn;
            for(var i = mlist.length; i-- ; ){
                fn = mlist[i];
                this[fn] = new Function('\
                  var arg = arguments;\
                  this.frameDef.done(function(win, $){\
                      $.'+ fn +'.apply($, arg)\
                  });\
                ');
            }
        },
        // 清空不必要的数据
        clean: function(){
            this.$body = this.$iframe = this.init = this.createCrossMethod = this.clean = null;
            delete this.init;
            delete this.createCrossMethod;
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
