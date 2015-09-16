/**
 * 元素拖动, jquery 插件 [半成品，够项目使用了]
 * @author da宗熊
 * @email 1071093121@qq.com
 * @desc 提供有限的功能，缩放是对能拖动元素的直接父亲操作的 [我也想不出有什么场景，是对自己缩放的]
 * @example
 *      $("#id").zdraggable();                  // 元素可拖动
 *      $(".class").zdraggable({clone: true});  // 拖动时，复制元素，而不是拖动本身
 * @param
 *      {Object} 配置对象
 *             clone: 是否复制元素, zIndex: 拖动的zIndex， connectTo: 与zdroppable配合使用的jquery选择器
 */
 ;!function($){
     var $dom = $(document);
     var dataKey = "zdrag_data";

     // 可缩放的拖动
     function zdrag($list, opts){

         // 鼠标在页面中的初始坐标
         var pageX = pageY = 0;
         // 拖动元素初始 x, y 位置
         var elemTop = elemLeft = 0;
         // 页面缩放
         var zoom = opts.zoom;
         // 拖动时的zIndex
         var zIndex = opts.zIndex;
         // 拖动时，是否复制元素
         var clone = opts.clone;
         // 是否与某一个板块链接
         var connectTo = opts.connectTo;
		 
		
		 // 直属父亲元素
		 // zdroppable 元素，可能不是它的offsetParent
		 var $listPt = $list.closest(".zdrop-container");
		 if($listPt.length <= 0){
			 $listPt = $list.offsetParent();
		 }
		 // 修正缩放
		 typeof zoom === "number" && $listPt.css("zoom", zoom);
		 
         // 被复制的元素
         var $new;
         // 鼠标按下
         function mousedonw(e){
             // 原始的 pageX 和 pageY
             pageX = e.pageX;
             pageY = e.pageY;

             var $that = $(this);

             var pos = $that.position();
             var css = {
                 position: "absolute",
                 cursor: "move",
                 margin: "0",
                 "z-index": zIndex
             };

             elemTop = $that[0].offsetTop;
             elemLeft = $that[0].offsetLeft;

             // 复制元素?
             if(clone){
                 $new = $that.clone();
                 $new.removeData(dataKey);
                 $new.appendTo($that.offsetParent());

                 var offset = $that.offset();
                 elemTop = offset.top;
                 elemLeft = offset.left;
             }else{
                 $new = $that;
             }

             $new.css($.extend({top: elemTop, left: elemLeft}, css));

             // 开始劫持 dom
             capture();

			 return false;
         };

         // 开始检测dom的鼠标移动
         function capture(){
			 zoom = +$listPt.css("zoom") || 1;
             // 拖动中
             $dom.on("mousemove.zdrag", function(e){
                 // 当前鼠标，在页面中的坐标
                 var x = e.pageX, y = e.pageY;

                 $new.css({
                     top: function(i, val){return elemTop + (y - pageY) / zoom;},
                     left: function(i, val){return elemLeft + (x - pageX) / zoom;}
                 });
             });

             removeCapture();
         };
         // 移除监听
         function removeCapture(){
             $dom.one("mouseup.zdrag mouseleave.zdrag", function(e){
                 // 发布最终事件
                 $new.css({
                     "z-index": "",
                     "cursor": ""
                 });
                 // 这里需要验证，是否有 drop 事件
                 if(connectTo){
                     $dom.trigger("zdrop", [$new, zoom, connectTo || "*"]);
                     $new.remove();
                 }
                 $dom.off("mouseup.zdrag mouseleave.zdrag mousemove.zdrag");
             });
         };

         // 监听鼠标按下
         $list.on("mousedown.zdrag", mousedonw);
		 

         return {
             setZoom: function(z){
                 $listPt.css("zoom", z);
             }
         };
     }

     // 删除
     function destroy($list){
         $list.off("mousedown.zdrag").removeData(dataKey);
     };

     $.fn.extend({
         zdraggable: function(options){
             var type = typeof options;
             if(type === "string"){
                 switch(options){
                     case "destroy":
                         destroy(this);
                         break;
                     case "zoom":
                         var data = this.data(dataKey), zoom = arguments[1];
                         if(data && typeof zoom === "number"){
                             data.setZoom(zoom);
                         }
                         break;
                 }
             }else{
                 var data = zdrag(this, $.extend({zIndex:100, clone: false}, options || {}));
                 this.data(dataKey, data);
             }

             return this;
         }
     });

 }($);

/**
 * 与zdraggable配套使用的放入操作
 * @author da宗熊
 * @email 1071093121@qq.com
 * @desc 这个缩放，做的够完善的，但是就不知道scale和zoom那个会比较优化..
 * @example
 *      $("#container").zdroppable();       // 可放入所有元素
 * @param
 *      {Object} 配置
 *          zoom: 原始的缩放    accept: 可接受放入的元素    drop: 成功放入元素时的回调函数
 * @return
 *      {setZoom: function(z){重新设置zoom值}}
 */
 ;!function($){
     var $dom = $(document);
     // 检测列表
     var zList = [];
     // data的参数key
     var dataKey = "zdrop-opts";
	 // 统一的className
	 var className = "zdrop-container";

     // 自增id
     var ID = 1000, ID_KEY = "zdrop_key_";
     function id(){
         return ID_KEY + ID++;
     };

     // 放入事件
     $dom.on("zdrop", function(e, $elem, zoom, connectTo){
         var width = $elem.outerWidth(),
             height = $elem.outerHeight(),
             offset = $elem.offset();
         var x = offset.left,
             y = offset.top;

         zList.forEach(function($list){
             $list.each(function(i, v){
                 var $v = $(v), opts = $v.data(dataKey), offset = $v.offset();
                 offset.top *= opts.zoom;
                 offset.left *= opts.zoom;
                 // 两个矩形相交，触发回调函数
                 // 元素满足 accept 条件
                 if(intersect(
                         {x: x * zoom, y: y * zoom, width: width * zoom, height: height * zoom},
                         {x: offset.left, y: offset.top, width:$v.outerWidth() * opts.zoom, height: $v.outerHeight() * opts.zoom}
                     ) && $elem.is(opts.accept) && $v.is(connectTo)
                 ){
                     // 把元素修正为相当于当前元素的..
                     var $new = $elem.clone(), eoffset = $elem.offset();
                     $new.css({
                         top: function(i, v){
                             return (eoffset.top * zoom - offset.top)/opts.zoom;
                         },
                         left: function(i, v){
                             return (eoffset.left * zoom - offset.left)/opts.zoom;
                         }
                     })
                     opts.drop($new);
                 }
             })
         });
     });

     // 可放入
     function zdrop($list, opts){
         var zoom = opts.zoom,
             accept = opts.accept,
             drop = opts.drop;

         // 修正列表的 position 属性
         // 因为加入的元素，往往是 absolute 类型的
         $list.data(dataKey, opts).css({
			 "position": function(i, v){
				 return v == "static" ? "relative" : v;
			 },
			 "zoom": zoom
		 }).addClass(className);

         // 加入检测列表
         $list.data(ID_KEY, id());
         zList.push($list);

     };

     // 销毁
     function destroy($list){
         var id = $list.data(ID_KEY);

         // 相同ID的，销毁
         zList.forEach(function(item, index){
             if(item.data(ID_KEY) === id){
                 // 把当前项移除
                 // 不用修正索引，因为索引是每次进入回调函数时，才确定的
                 zList.splice(index, 1);
             }
         });
     };

     // 元素是否与指定矩形相交
     // offset 是因为之前已经计算过了，就不要浪费了~
     function intersect(rect1, rect2){
         var halfWidth = rect1.width / 2 + rect2.width / 2, halfHeight = rect1.height / 2 + rect2.height / 2;
         var x0 = rect1.x + rect1.width / 2, y0 = rect1.y + rect1.height / 2;
         var x1 = rect2.x + rect2.width / 2, y1 = rect2.y + rect2.height / 2;

         return Math.abs(x1 - x0) <= halfWidth && Math.abs(y1 - y0) <= halfHeight;
     };

     $.fn.extend({
         zdroppable: function(options){
             var type = typeof options;
             if(type === "string"){
                 switch(options){
                     case "destroy":
                         destroy(this);
                         break;
                     case "zoom":
                         var opts = this.data(dataKey), zoom = arguments[1];
                         if(opts && typeof zoom === "number"){
                             opts.zoom = zoom;
                             this.css("zoom", zoom);
                         }
                         break;
                 }
             }else{
                 zdrop(this, $.extend({accept: "*", zoom: 1, drop: $.noop}, options || {}));
             }

             return this;
         }
     })
 }($);
