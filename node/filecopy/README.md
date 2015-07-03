# 一个简单的复制功能

把文件，批量复制到其它目录中

使用命令:

``` javascript

node main xxx.json

```

xxx.json是复制命令的参数配置:

"isClearRoot": true // 是否清空目标目录

"fromRoot": "./test" // 复制的根目录，不设置，则是当前命令运行的目录

"toRoot": "E:\\github\\flamingo\\node\\copy\\test"	// 复制的目标目录

// 下面，都是 "from目录": "to目录" 的配置，都是相对与 fromRoot 和 toRoot 的

"xxx/js": "yyy/js/xxcms4"

"xxx/images": "yyy/images/xxcms4"

"xxx/css": "yyy/css/xxcms4"


# 如何使用

通过 npm config get prefix 查看node modules的安装目录

把 ./bat 目录下的两个文件，放在 npm 目录下

把 ./filecopy 目录，放在 npm/node_modules 目录下

在控制台，输入 filecopy 测试
