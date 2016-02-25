console.log("变量声明");

var declareFn1 = () => {
    let name = "da宗熊";
    {
        // OK，块级作用域下，定义了一个不可更变的 name
        const name = "da宗熊2";
        console.log(name);
    }
    // 错误，因为定义过一次 name 了
    // let name = "da宗熊3";
    console.log(name);
};
declareFn1();


// 斐波那契
var fibonacci = {
    // 定义遍历器
    [Symbol.iterator]() {
        let pre = 0, cur = 1;
        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                return { done: false, value: cur }
            }
        };
    }
};
for (var n of fibonacci) {
    if (n > 5) {
        break;
    }
    console.log(`斐波那契:` + n);
}
