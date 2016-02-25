console.log("函数参数的默认值、参数分割");

var addFunc = (x, y = 12) => {
    console.log(`y默认12,相加: ${x + y}`);
};
addFunc(12);

var totalFunc = (x, ...vals) => {
    console.log(`所有值合并之后: ${x + vals.join("")}`);
};
totalFunc("我叫", "da宗熊", ",", "很高兴认识你");


var sumFunc = (x, y, z) => {
    console.log(`总计算结果是: ${x + y + z}`);
};
sumFunc(...[1, 2, 3]);
