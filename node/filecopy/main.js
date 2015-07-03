var fs = require("fs-extra"), path = require("path");

// console.log(process.argv);

var jsonFile = process.argv[2] || 'copy-conf.json';
var config;
try{
    config = fs.readJSONSync(jsonFile);
}catch(e){
    console.error('please check is ' + jsonFile +' exist?');
    console.log(e);
    return;
}

// from目录，to目录
// 是否清空to目录
var fromRoot = config.fromRoot || '', toRoot = config.toRoot || '';
var isClearRoot = config.isClearRoot;
config.fromRoot = config.toRoot = config.isClearRoot = null;

// 遍历配置，忽略空的目录
var item, fromPath, toPath;
for(var i in config){
    item = config[i];
    if(item){
        fromPath = path.join(fromRoot, i),
        toPath = path.join(toRoot, item);
        isClearRoot && fs.emptyDirSync(toPath);
        fs.copySync(fromPath, toPath);
        console.log('from:%s to:%s', fromPath, toPath);
    }
}

console.log('copy end...');
