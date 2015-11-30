# 前言

一般俗称的媒体查询，实则分为两块，分别是 media type 和 media query。组成的媒体查询，格式如下:

``` css
@media only screen and (max-width:900px){}
```

其中 only screen 是 media type，指定了哪些设备可以访问样式。
max-width:900px，则输入 query 部分，指定设备符合哪些条件，才能访问样式。

## 引入媒体查询

引入媒体查询，有几种方式

一、link 标签引入
``` html
	<link rel="stylesheet" media="only screen and (max-width:900px)" href="xx.css" />
```	

二、@import 中引入
``` css
	@import url(xxx.css) only screen and (max-width:900px);
```

三、样式中
``` css
	@media (orientation:landscape){}
```


## media type 的浏览器支持

 * IE5.5/6/7 不支持在 @import 中使用媒体类型
 * Safari/firefox 只支持 all, screen, print 这3中[包括 iphone 中的]
 * Opera 完全支持
 * Opera mini 支持 handheld，未指定，则使用 screen
 * Windows Mobile 系统中的IE支持 handheld，其它支持不明...


## media query 的浏览器支持
	
 * IE9 一下不支持
 * Firefox 3.5+ 支持
 * Opera 9.5+ 完全支持
 * Opera mini 5 支持
 * webkit 支持大部分
 * iPone OS 3.2 以前，不支持 orientation，iPad 和 iPhone 4开始，支持该属性
 * iPhone Safari 不支持 orientation (iPhone 4 开始支持)



# 响应式布局学习

## 关于优先级

PS: 记得给 meta 设置 viewport，不然 width != device-width，媒体查询就各种不准了

``` css
@media only screen and (max-width:900px){
	.main{color:red;}
}
.main{color:blue;}
```

如果这样子写，color:red，无论哪种分辨率下，都不能覆盖 color:blue;
因为 媒体查询，并不会提升 class 或 id 的优先级


相反，如果是位置调换，就达到了响应式布局的效果

``` css
.main{color:blue;}
@media only screen and (max-width:900px){
	.main{color:red;}
}
```

当屏幕宽度小于等于 900px 时，color:red 生效，大于 900px 时，color:blue 生效


## 可用设备名参数

| 名字 | 对应设备 |
| ------------- |:-------------:|
| all | 所有设备 |
| screen | 彩色电脑屏幕、智能手机屏幕 |
| print | 文档打印或打印预览模式 |
| projection | 项目演示，比如幻灯片 |
| tv | 电视 |
| braille | 盲文 |
| embossed | 盲文打印 |
| handheld | 手持设备，有限流量的 |
| tty | 滚定字母间距的网格的媒体，比如电传打印机 |
| speech | 演讲 |

设备名称，放在 媒体查询 条件的最前方，如:

``` css
@media only screen and (max-width:900px), only print and (max-width:500px){
	.main{color:red;}
}
```

PS: only 关键字，表明只有某种设备，此媒体查询才生效。个人觉得，好像不添加，也没什么问题的样子..

## 关键字

| 关键字 | 说明 |
| ----- | -----: |
| only | 限定某种设备 |
| not | 对于一条媒体查询的结果取反 |
| and | 把多条媒体属性组合起来，合并到同一条媒体查询中。只有每个属性都为真，这条媒体查询结果才为真 |
| , | 类似 or 的逻辑 |

only 关键字，最好不要省略。
因为对于支持 media query 的移动设备来说，如果存在 only 关键字，移动设备的浏览器就会忽略 only,并且直接根据后面的 media query 来使用样式文件。

对于不支持 media query 的设备，但又能读取 media type 的浏览器，如果遇到了 only，则会忽略该样式。

AND，某些移动设备，会很智能的把其它 media type 的样式，也加载进来，添加 only，能避免这种画蛇添足的行为


## 查询可用属性

实际上，媒体查询可用的属性，跟我们平时的CSS中，不太一致。

| 属性 | 值 | Min/Max | 描述 |
| :--- | :--- | :---: | :--- |
| color | 整数 | yes | 每种色彩的字节数 |
| color-index | 整数 | yes | 色彩表中的色彩数 |
| aspect-ratio | 整数/整数 | yes | 屏幕宽高比 |
| device-aspect-ratio | 整数/整数 | yes | 设备屏幕的输出宽高比 |
| device-width | length | yes | 设备屏幕的输出宽度 |
| device-height | length | yes | 设备屏幕的输出高度 |
| grid | 整数 | no | 是否是基于格栅的设备 |
| width | length | yes | 渲染界面的宽度 |
| height | length | yes | 渲染界面的高度 |
| monochrome | 整数 | yes | 单色帧缓冲器中没像素字节 |
| resolution | 分辨率(dpi/dpcm) | yes | 分辨率 |
| scan | Progressive Interlaced | no | tv媒体类型的扫描方式 |
| orientation | portrait/landscape | no | 横屏/竖屏 |

而 webkit 内核的浏览器，更有额外的查询属性:

| 属性 | 描述 |
| :--- | :--- |
| transform-2d | 支持 -webkit-transform 实现2d变换 |
| transform-3d | 支持 -webkit-transform 实现3d变换 |
| transition | 支持 transition 变换的浏览器 |
| animation | 支持 animation 的浏览器 |

PS: 估计如果不是手机，几乎用不上..

 
