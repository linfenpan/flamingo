"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

console.log("变量声明");

var declareFn1 = function declareFn1() {
    var name = "da宗熊";
    {
        // OK，块级作用域下，定义了一个不可更变的 name
        var _name = "da宗熊2";
        console.log(_name);
    }
    // 错误，因为定义过一次 name 了
    // let name = "da宗熊3";
    console.log(name);
};
declareFn1();

// 斐波那契
var fibonacci = _defineProperty({}, Symbol.iterator, function () {
    var pre = 0,
        cur = 1;
    return {
        next: function next() {
            var _ref = [cur, pre + cur];
            pre = _ref[0];
            cur = _ref[1];

            return { done: false, value: cur };
        }
    };
});
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = fibonacci[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        if (n > 5) {
            break;
        }
        console.log("斐波那契:" + n);
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