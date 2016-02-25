console.log("Generator函数测试");

function* helloGenerator(){
    yield 'hellow';
    yield 'world';
    return 'end!';
};
var hg = helloGenerator();
console.log(hg);


// 看一个复杂的例子:
var arr = [1, [2, 3], [4, 5, 6]];
var flat = function* (list) {
    for (let i = 0, max = list.length; i < max; i++) {
        let item = list[i];
        if (typeof item !== "number") {
            yield* flat(item);
        } else {
            yield item;
        }
    };
};
for(var f of flat(arr)) {
    console.log(`Generator遍历数组: ${f}`);
}


var testNext = function*(x) {
    var y = yield(x + 1);
    var z = yield(y - 1);
    return x + y + z;
};

var test = testNext(5);
// 由于 next 方法的参数，是给上一个 yield 语句设置值的，所以，第一次调用 next，不能带有参数，而 v8 引擎，也会忽略掉第一次设置的参数
console.log( test.next() ); // 第一次：6
console.log( test.next(11) ); // 第二次：10, 11 是给上一个 yield 的
console.log( test.next(10) ); // 5 + 11 + 10 = 26


// 想第一次，就有结果，可以封装一层
var wrapper = (generatorFn) => {
    return function (...args) {
        let generator = generatorFn(...args);
        // 干掉第一次 next
        generator.next();
        return generator;
    }
};
var wrapped = wrapper(function*(){
    console.log(`First input: ${yield}`);
    return "DONE!";
});
wrapped().next("hello!");


function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

var genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a');
// 1. a
genObj.next('b');
// 2. b ==> {value: "result", done: true}


var gen = function*() {
    try {
        yield;
    } catch(e) {
        console.log("内部错误", e);
    }
};

var g = gen();
g.next();

try {
    g.throw("a");
    g.throw("b");   // 内部捕获1次后，不再捕获错误
} catch(e) {
    console.log("外部错误", e);
}
// 内部错误, a
// 外部错误, b



var clock = function*(_) {
    while (true) {
        yield _;
        console.log('Tick!');
        yield _;
        console.log('Tock!');
    }
};
var cl = clock(1);
cl.next();
cl.next();
cl.next();

// 每调用1次next，就到 yield 处停止
// 然，本次 next，返回的结果，就是 yield 后跟着的表达式
// 下一次 next设置的参数，就是本次 yield 对应的值，本次 yield 后面带的表达式，仅且用于 本次 next 的返回
