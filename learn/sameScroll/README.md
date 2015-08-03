# 内容同步滚动

有左右两侧的布局，左侧布局，比右侧布局要高。当页面滚动到底部时，需要将左右两侧的底部，进行对齐。
这时，就需要两侧内容，进行不同滚动距离的同步滚动。

## 代码分析

### 计算时机
什么时候开始让两侧进行不同距离的滚动计算呢？

```
var offsetTop = $("#parent").offset().top;
var scrollTop = window.scrollY;
```

当 scrollTop 大于 offsetTop 时，就得开始计算，修正较短的一侧的滚动距离


### 模拟滚动距离
因为随着页面滚动，如果要视觉上，让两侧看起来，是按同样百分比进行滚动，则需要将短的那一块内容，进行滚动距离修正。
这里选择 position: relative; + top: ?px; 进行模拟滚动的距离。

有几个原因：

 1. top 正好模拟往下滚动
 2. relative并不影响原来布局

那最终，短的一侧，距离顶部的距离，应该这样计算：
```
var clientHeight = 较短的元素的高度;
var maxHeight = 最高的元素的高度;

// 最后的top属性，应该是:
var lastTop = maxHeight - clientHeight;
// 那某一滚动距离的top属性，应该是这样计算:
var percent = 滚动过的百分比;
var top = lastTop * percent;
```

### 滚动距离百分比

最后一步，就是计算滚动的百分比，其中，可最高的元素，可滚动的距离，应该是：
```
var canScrollDistance = maxHeight - window.innerHeight;
```
因为计算的，是最高的元素，滚动多少间距，能完全滚入屏幕，所以，要减去屏幕的高度，因为第1屏本来就在屏幕内部。

当前真正需要计算的滚动距离，应该是：
```
var realScrollDistance = window.scrollY - offsetTop;
```
最后的百分比，那就是：
```
var percent = Math.min(1, realScrollDistance / canScrollDistance );
```
考虑到，realScrollDistance可能会比canScrollDistance大，所以，做了个最大值的判定。

PS：当页面底下，还有额外元素或样式影响时，realScrollDistance真可能比想象的要大。


### 最后整合

完整例子：
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>左右同步滚动测试</title>
    <style>
        *{padding:0;margin:0;}
        #container{
            margin:130px 0;
        }
        #container::after{
            content: "";
            clear:both;
            display:table;
            width:0;height:0;
            visibility: hidden;
        }
        #left{
            float:left;
            width:80%;
        }
        #left li{
            background: #DEF6FF;
        }
        #right{
            float:left;
            width:20%;
        }
        #right li{
            background:#efefef;
        }
        li{
            height:200px;
            border:1px solid #ccc;
            font-size:26px;
            text-align: center;
            list-style:none;
        }
    </style>
</head>
<body>

<div id=container>
    <ul id="left">
        <li>101</li>
        <li>102</li>
        <li>103</li>
        <li>104</li>
        <li>105</li>
        <li>106</li>
        <li>107</li>
        <li>108</li>
        <li>109</li>
        <li>1010</li>
        <li>1011</li>
    </ul>
    <ul id="right">
        <li>201</li>
        <li>202</li>
        <li>203</li>
        <li>204</li>
        <li>205</li>
        <li>206</li>
    </ul>
</div>

</body>
<script src="../jquery.js" charset="utf-8"></script>
<script type="text/javascript">
// 子元素同步滚动
var $dom = $(document), $win = $(window);

var $container = $("#container");
var $children = $container.children();

// 计算 $container 的offsetTop，只有超过offsetTop，才开始滚动
var offsetTop = $container.offset().top;

// 计算最大的高度
function caclulateMaxHeight(){
    return Math.max.apply(null, $children.map(function(i, v){return v.clientHeight;}));
}
// 计算window的可滚动高度
// function caclulateScrollHeight(){
//     return $dom.height() - $win.height();
// }
// 遍历children，找出最大高度
var maxHeight = 0;
// window的窗口高度
var winHeight = 0;

// 给children添加相对定位
$children.css({position: "relative"});

// offsetTop 是不会变的
// 但是，maxHeight，则可能因为ajax等原因，而变化
// 两种方案：
// 1. scroll 的时候，动态计算maxHeight[这次选择这个!!]
// 2. 让外部通知插件的高度变化
$win.on("scroll", function(){
    var scrollTop = $win.scrollTop();
    // 已经滚动超过 offsetTop，则开始处理
    if( scrollTop >= offsetTop){
        // 最大高度
        maxHeight = caclulateMaxHeight();
        winHeight = $win.height();
        // 剩余能滚动的距离 = maxHeight - winHeight
        var totalCanScrollDistance = maxHeight - winHeight;

        // 需要计算的滚动距离 = scrollTop - offsetTop
        var realScrollDistance = scrollTop - offsetTop;
        // 滚动的百分比，因为realScrollDistance可能大于totalCanScrollDistance
        var percent = Math.min(1, realScrollDistance / totalCanScrollDistance);

        // 修正所有子元素
        $children.each(function(i, v){
            var clientHeight = v.clientHeight;
            if( v.clientHeight < maxHeight ){
                // 能往上挪动的距离 = maxHeight - clientHeight
                if( clientHeight > winHeight ){
                    v.style.top = (maxHeight - clientHeight) * percent + "px";
                }else{
                    v.style.top = realScrollDistance + "px";
                }
            }
        });
    }else if( scrollTop < offsetTop ){
        $children.each(function(i, v){
            v.style.top = 0 + "px";
        });
    }
});


</script>
</html>

```