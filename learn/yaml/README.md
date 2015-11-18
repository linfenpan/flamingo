# 简介

YAML[ Yet Another Markup Language ]英译过来，就是“另一门标志语言”。它是一种直观的，容易被人类阅读，以及被机器识别的数据格式。

它类似于XML和，但语法上，要比前者简洁很多。

具体感受一下，一个简单的 yml 文件:
``` yml
Author:
  name: da宗熊
  age: 还年轻
```

通过解析器生成后，最终得到数据 :

``` json
{
  Author: {
    name: "da宗熊",
    age : "还年轻"
  }
}
```

----------

# 格式

YAML文件，可以存储 map 或 array 对象。

## map和array定义

map通过缩进来表示，其中的 key/map对，用 ":" 进行间隔。array通过减少"-"来表示。“#”代表注释。如下例子:

``` yml
# 这一行注释，是不会输出的
Author:
  name: da宗熊 # 这也是注释，不会输出的
  desc:
    - 帅气
    - 阳光
    - 很好看
```
将得出数据:
``` json
{
  Author: {
    name: "da宗熊",
    desc: ["帅气", "阳光", "很好看"]
  }
}
```

map对象，也可以使用json方式定义:
``` yml
Author: {name: da宗熊, age: 未知}
```
PS: JSON的语法是YAML1.2版的子集，同时非常接近YAML1.0与1.1版的子集，因此大部分的JSON文件都可以被YAML的剖析器剖析

同样的，array对象，也可以类似的定义:
``` yml
List1: [a, b, c]
# 与下面定义等价
List2:
  - a
  - b
  - c
```

## 空值

YAML有几种空值的表现方式，分别是 "null"、"~" 和 不填。
``` yml
text1: null
text2: ~
text3:
```
最后得出数据:
``` json
{text1: null, text2: null, text3: null}
```

## 字符串

字符串如果涉及到换行，可以使用 "|" 或 ">" 作为前缀标志。"|"表示下面的内容，换行; “>"表示，下面内容中，所有的换行，变为空格。
``` yml
text1: |
  一段文字
  第二段文字
text2: >
  一段文字
  第二段文字
```
将得到:
``` json
{
  text1: "一段文字↵第二段文字",
  text2: "一段文字 第二段文字"
}
```

## 合并

可指定特定的数据，与数组中当前的数据进行合并:
``` javascript
merge:
  # 声明两个可引用的数据，这两个数据，也会输出
  - &CENTER {x: 1, y: 1}
  - &LEFT {x: 0, y: 1}
  - # 定义对象1
    <<: *CENTER
    label: 引入CENTER数据，与当前数据合并
  - # 定义对象2
    <<: [*CENTER, *LEFT]
    label: 可引入多个数据
  - # 定义对象3
    center: *CENTER
    left:   *LEFT
    label:  也可以纯粹的引入，而不合并
```
将会输出:
``` json
{
  "merge": [
    {
      "x": 1,
      "y": 1
    },
    {
      "x": 0,
      "y": 1
    },
    {
      "x": 1,
      "y": 1,
      "label": "引入CENTER数据，与当前数据合并"
    },
    {
      "x": 1,
      "y": 1,
      "label": "可引入多个数据"
    },
    {
      "center": {
        "x": 1,
        "y": 1
      },
      "left": {
        "x": 0,
        "y": 1
      },
      "label": "也可以纯粹的引入，而不合并"
    }
  ]
}
```

----------


# 最后

更多语法，可参考 [这里](http://nodeca.github.io/js-yaml/)
