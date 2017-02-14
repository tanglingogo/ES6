"use strict";

require("babel-polyfill");

var _hello = require("./hello");

//main.es6

console.log(_hello.bar + "_" + _hello.foo);
(0, _hello.fn0)();
(0, _hello.fn1)();