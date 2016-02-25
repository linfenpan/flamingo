define(["exports", "./module1"], function (exports, _module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    for (let _key in _module) {
        if (_key === "default") continue;
        Object.defineProperty(exports, _key, {
            enumerable: true,
            get: function () {
                return _module[_key];
            }
        });
    }

    exports.default = function (x) {
        return Math.exp(x);
    };

    var e = exports.e = 2.71828182846;
    ;
});