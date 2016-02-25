'use strict';

var _marked = [helloGenerator, dataConsumer].map(regeneratorRuntime.mark);

console.log("Generator函数测试");

function helloGenerator() {
    return regeneratorRuntime.wrap(function helloGenerator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return 'hellow';

                case 2:
                    _context.next = 4;
                    return 'world';

                case 4:
                    return _context.abrupt('return', 'end!');

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
};
var hg = helloGenerator();
console.log(hg);

// 看一个复杂的例子:
var arr = [1, [2, 3], [4, 5, 6]];
var flat = regeneratorRuntime.mark(function flat(list) {
    var i, max, item;
    return regeneratorRuntime.wrap(function flat$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    i = 0, max = list.length;

                case 1:
                    if (!(i < max)) {
                        _context2.next = 12;
                        break;
                    }

                    item = list[i];

                    if (!(typeof item !== "number")) {
                        _context2.next = 7;
                        break;
                    }

                    return _context2.delegateYield(flat(item), 't0', 5);

                case 5:
                    _context2.next = 9;
                    break;

                case 7:
                    _context2.next = 9;
                    return item;

                case 9:
                    i++;
                    _context2.next = 1;
                    break;

                case 12:
                    ;

                case 13:
                case 'end':
                    return _context2.stop();
            }
        }
    }, flat, this);
});
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = flat(arr)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var f = _step.value;

        console.log('Generator遍历数组: ' + f);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var testNext = regeneratorRuntime.mark(function testNext(x) {
    var y, z;
    return regeneratorRuntime.wrap(function testNext$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return x + 1;

                case 2:
                    y = _context3.sent;
                    _context3.next = 5;
                    return y - 1;

                case 5:
                    z = _context3.sent;
                    return _context3.abrupt('return', x + y + z);

                case 7:
                case 'end':
                    return _context3.stop();
            }
        }
    }, testNext, this);
});

var test = testNext(5);
// 由于 next 方法的参数，是给上一个 yield 语句设置值的，所以，第一次调用 next，不能带有参数，而 v8 引擎，也会忽略掉第一次设置的参数
console.log(test.next()); // 第一次：6
console.log(test.next(11)); // 第二次：10, 11 是给上一个 yield 的
console.log(test.next(10)); // 5 + 11 + 10 = 26

// 想第一次，就有结果，可以封装一层
var wrapper = function wrapper(generatorFn) {
    return function () {
        var generator = generatorFn.apply(undefined, arguments);
        // 干掉第一次 next
        generator.next();
        return generator;
    };
};
var wrapped = wrapper(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    _context4.t0 = console;
                    _context4.next = 3;
                    return;

                case 3:
                    _context4.t1 = _context4.sent;
                    _context4.t2 = 'First input: ' + _context4.t1;

                    _context4.t0.log.call(_context4.t0, _context4.t2);

                    return _context4.abrupt('return', "DONE!");

                case 7:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _callee, this);
}));
wrapped().next("hello!");

function dataConsumer() {
    return regeneratorRuntime.wrap(function dataConsumer$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    console.log('Started');
                    _context5.t0 = console;
                    _context5.next = 4;
                    return;

                case 4:
                    _context5.t1 = _context5.sent;
                    _context5.t2 = '1. ' + _context5.t1;

                    _context5.t0.log.call(_context5.t0, _context5.t2);

                    _context5.t3 = console;
                    _context5.next = 10;
                    return;

                case 10:
                    _context5.t4 = _context5.sent;
                    _context5.t5 = '2. ' + _context5.t4;

                    _context5.t3.log.call(_context5.t3, _context5.t5);

                    return _context5.abrupt('return', 'result');

                case 14:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _marked[1], this);
}

var genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a');
// 1. a
genObj.next('b');
// 2. b ==> {value: "result", done: true}

var gen = regeneratorRuntime.mark(function gen() {
    return regeneratorRuntime.wrap(function gen$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    _context6.prev = 0;
                    _context6.next = 3;
                    return;

                case 3:
                    _context6.next = 8;
                    break;

                case 5:
                    _context6.prev = 5;
                    _context6.t0 = _context6['catch'](0);

                    console.log("内部错误", _context6.t0);

                case 8:
                case 'end':
                    return _context6.stop();
            }
        }
    }, gen, this, [[0, 5]]);
});

var g = gen();
g.next();

try {
    g.throw("a");
    g.throw("b"); // 内部捕获1次后，不再捕获错误
} catch (e) {
    console.log("外部错误", e);
}
// 内部错误, a
// 外部错误, b

var clock = regeneratorRuntime.mark(function clock(_) {
    return regeneratorRuntime.wrap(function clock$(_context7) {
        while (1) {
            switch (_context7.prev = _context7.next) {
                case 0:
                    if (!true) {
                        _context7.next = 9;
                        break;
                    }

                    _context7.next = 3;
                    return _;

                case 3:
                    console.log('Tick!');
                    _context7.next = 6;
                    return _;

                case 6:
                    console.log('Tock!');
                    _context7.next = 0;
                    break;

                case 9:
                case 'end':
                    return _context7.stop();
            }
        }
    }, clock, this);
});
var cl = clock(1);
cl.next();
cl.next();
cl.next();

// 每调用1次next，就到 yield 处停止
// 然，本次 next，返回的结果，就是 yield 后跟着的表达式
// 下一次 next设置的参数，就是本次 yield 对应的值，本次 yield 后面带的表达式，仅且用于 本次 next 的返回