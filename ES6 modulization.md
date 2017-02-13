# ES6模块化

## 基本规则与特点
* 每一个模块只加载一次，每一个JS只执行一次。一个模块就是一个单例，或者说是一个对象；
* 每一个模块内声明的变量都是局部变量，不会污染全局作用域
* 模块内部的变量或者函数可以通过export导出
* 一个模块可以导入别的模块
```js
//lib.js
//导出常量
export const sqrt = Math.sqrt;
//导出函数
export function square(x) {
    return x * x;
}
//导出函数
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
//main.js
import { square, diag } from './lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

## 导出方式
* 使用 export{接口} 导出接口， 大括号中的接口名字为上面定义的变量， import和export是对应的；
```
//lib.js
let bar = "stringBar";
let foo = "stringFoo";
let fn0 = function() {
    console.log("fn0");
};
let fn1 = function() {
    console.log("fn1");
};
export{ bar , foo, fn0, fn1}
//main.js文件
import {bar,foo, fn0, fn1} from "./lib";
console.log(bar+"_"+foo);
fn0();
fn1();
```
* 在export接口的时候， 我们可以使用 XX as YY， 把导出的接口名字改了， 比如： closureFn as sayingFn， 把这些接口名字改成不看文档就知道干什么的：
* 直接在export的地方定义导出的函数，或者变量
```
//lib.js
export let foo = ()=> {console.log("fnFoo");
return "foo"},bar = "stringBar";
```
* export defalut : 如果一个js模块文件就只有一个功能， 那么就可以使用export default导出;这种方式不需要知道变量的名字，相当于是匿名的，直接把开发的接口给export；
```
//lib.js
export default "string";
//main.js
import defaultString from "./lib";
console.log(defaultString);
```
* export XX as default : export也能默认导出函数， 在import的时候， 名字随便写， 因为每一个模块的默认接口就一个：
```
//lib.js
let fn = () => "string";
export {fn as default};
//main.js
import defaultFn from "./lib";
console.log(defaultFn());
```
* 使用通配符* ,重新导出其他模块的接口
```
//lib.js
export * from "./other";
//如果只想导出部分接口， 只要把接口名字列出来
//export {foo,fnFoo} from "./other";
//other.js
export let foo = "stringFoo", fnFoo = function() {console.log("fnFoo")};
//main.js
import {foo, fnFoo} from "./lib";
console.log(foo);
console.log(fnFoo());
```
## 模块化发展历程
### IIFE
```
const myModule = (function (...deps){
       // JavaScript chunk
       return {hello : () => console.log(‘hello from myModule’)};
    })(dependencies);
```
### AMD
```
  <pre>define(‘myModule’, [‘dep1’, ‘dep2’], function (dep1, dep2){
        // JavaScript chunk, with a potential deferred loading
        return {hello: () => console.log(‘hello from myModule’)};
    });
    // anywhere else
    require([‘myModule’], function (myModule) {
        myModule.hello() // display ‘hello form myModule’
    });
```
### CommonJs
```
// file1.js
    modules.export = {
        hello : () => console.log(‘hello from myModule’)
    }
// file2;
    const myModule = require('./file1.js');
    myModule.hello();
```
### UMD
AMD适合浏览器，CommonJs适合Node，UMD通过把二者结合起来，使之在各种需求下都是可集成的
```
   (function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
        typeof define === 'function' && define.amd ? define(factory) :
    (factory());
    }(this, function () {
        // JavaScript chunk
        return {
           hello : () => console.log(‘hello from myModule’)
        }
    });
```
### ES6
* 可以限制import的内容，便于静态分析
**重大差异:**
* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。这是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

> [参考文献](http://es6.ruanyifeng.com/#docs/module)