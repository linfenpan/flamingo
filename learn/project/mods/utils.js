// 类型查询
var typeToString = Object.prototype.toString;
function queryType(o){
    return typeToString.call(o).slice(1, -1).split(" ")[1].toLowerCase();
};

// 获取函数内的字符串
function queryFnInnerText(fn){
    var str = fn.toString();
    // 为什么 是 /*! */ 这种注释呢? 因为压缩的时候，可以剔除
    return str.slice(str.indexOf("/*!") + 3, str.lastIndexOf("*/")).replace(/^[\n\r]*|[\n\r]*$/g, "");
};

// 数据的复制
function extend(){
    var obj = arguments[0] || {}, max = arguments.length - 1, index = 1;
    var item;
    do{
        item = arguments[index] || {};
        for(var i in item){
            if(item.hasOwnProperty(i)){
                obj[i] = item[i];
            }
        }
        index++;
    }while(index < max);
    return obj;
};

// 字符串转 json
function toJSON(str){
    return JSON ? JSON.parse(str) : (new Function("return "+ str))();
};

// 简单的模板方法
function Format(data){
    var str = "";
    for(var i in data){
        str += "var " + i + " = \"" + data[i].toString().replace(/(")/g, "\$1") + "\";\n"
    };
    str += 'return str.replace(/\\${([^}]*)}/g, function(str, key){\nreturn eval(key) || "";\n});\n';
    return new Function("str", str);
};
