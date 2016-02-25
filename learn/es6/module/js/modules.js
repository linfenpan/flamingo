define(["./module1", "./module2"], function (_module, _module2) {
  "use strict";

  var math = _interopRequireWildcard(_module);

  var _module3 = _interopRequireDefault(_module2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  console.log("模块测试");
  console.log("2π:" + math.sum(math.pi, math.pi));

  console.log("exp:" + (0, _module3.default)(_module2.pi, _module2.e));
});