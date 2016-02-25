var events = [1, 2, 3, 4, 5, 6];
var odds = events.map(v => v + 1);
console.log("odds: ", odds);

// Lexical this
var bob = {
    _name: "Bob",
    _friends: [],
    printFriends() {
        this._friends.forEach(f => console.log(this._name + " knows " + f));
    }
};


var objPrototype = {
    toString() {
        return "自定义object";
    }
};

var objName = "dashareB";
var selfObject = {
    __proto__: objPrototype,
    objName,
    [ "prop_" + (() => 42)() ]: 42
};
console.log(selfObject.toString() + ", 其中 prop_42:" + selfObject.prop_42);


console.log(`用斜引号的字符串也可以使用了`);
var name = "da宗熊";
console.log(`也可以使用模板表达式了: ${name}`);
// String.raw 是对斜杠进行转义咧~
String.raw`In ES5 "\n" is a line-feed.`;
// String.raw 也可以作为模板，替换之
// 下面两者是等价的
console.log( String.raw({ raw: "test"}, 0, 1, 2) );
console.log( String.raw({ raw: ["t", "e", "s", "t"]}, 0, 1, 2) );
