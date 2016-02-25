/*
    JSON plugin
*/
define({
  translate: function(load) {
    // 把源码转换为想要使用的内容
    if (this.builder)
      return 'module.exports = ' + JSON.stringify(JSON.parse(load.source));
  },
  instantiate: function(load) {
    // 这个，是 exports 到外部的内容
    // 这里 loader.source 已经 === "module.exports = {age: 123}"
    //  证明了，先经过 translate，然后才会进入 instantiate
    if (!this.builder)
      return JSON.parse(load.source);
  }
});
