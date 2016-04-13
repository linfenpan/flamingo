// 运行 npm install 安装所有依赖
// 然后运行
//      fis3 server start
//      fis3 release -wL -d [需要发布到的目录]

//模块化方案，本项目选中CommonJS方案(同样支持异步加载哈)
fis.hook('module', {
  mode: 'commonJs'
});

// widget发布时产出到 /static 目录下
fis.match('/widget/**', {
    isMod : true,
    release: '/static/$0'
});

//资源配置表
fis.match('/map.json',{
    release: '/tpl/config/map.json'
});

//页面和widget模板
fis.match("/{widget,page}/**.php",{
    isMod : true,
    isHtmlLike : true,
    url: '$&', //此处注意，php加载的时候已带tpl目录，所以路径得修正
    release: '/tpl/$&',
    optimizer: fis.plugin("htmlmin")
});

//文档就不发布了
fis.match("/doc/**",{
  release : false
});

//开启组件同名依赖
fis.match('*.{html,js,php}', {
  useSameNameRequire: true
});

//开启压缩
fis.match("*.js", {
    optimizer: fis.plugin("uglify-js")
});
fis.match("*.css", {
    optimizer: fis.plugin("clean-css")
});
