<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-07-28 13:56:45
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-08-04 18:32:41
--> 
# Generator

## generator含义

[Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[可迭代协议和迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)

>1. 生成器对象是由一个 generator function 返回的,并且它符合可迭代协议和迭代器协议。
>2. 使用构造函数 GeneratorFunction 或 function* expression 定义生成器函数

>注：GeneratorFunction构造器生成新的生成器函数/对象。在JavaScript中，生成器函数实际上都是GeneratorFunction的实例对象。但GeneratorFunction并不是一个全局对象。它可以通过```Object.getPrototypeOf(function*(){}).constructor``` 获取


**语法**

```js
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

let g = gen(); 
console.log(g)
// "Generator { }"
```
>function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个**Generator对象**

```js
// 不同写法
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```

> generator函数运行，生成了Generator对象，Generator对象既是一个迭代器，又是一个可迭代对象。迭代器的核心是部署了next()方法，可迭代对象是符合迭代器协议的对象，可以被 **for...of**, **...**, **解构赋值**, **yield*** 进行遍历等操作。

## yield
Generator函数返回一个遍历器对象，调用next方法才会进行遍历下一个状态，yield表达式就表示暂停标志
```js
function* gen() {
  yield  123 + 456;
}
```

generator也可以不用yield表达式，那他就是一个单纯的暂缓执行函数
```js

function* f() {
  console.log('执行了！')
}

var generator = f();

generator.next()   // 此处执行

```

## next
>返回一个由 yield表达式生成的值。
```js
eg：

function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b
```

>ps：
>- 第一个next调用只作为启动生成器用，并不会传入任何东西，如果传入了参数也会被自动忽略掉。
>- next()执行完毕后会返回一个对象，属性值有两个，分别为value(从yield或return处拿到的值)和done(boolean值，标识生成器是否执行完毕)。

next练习

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

// 不传参
var a = foo(5);
a.next() 
a.next() 
a.next() 
// 传参
var b = foo(5);
b.next() 
b.next(12) 
b.next(13) 
```

自动遍历Generator生成的Iterator对象， 不需要调用next

+ ...(扩展运算)
+ 解构赋值
+ Array.from()
+ Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
+ Promise.all()
+ Promise.race()
+ yield*
+ for...of

## for...of循环

```js
eg:

function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5


ps: for...of 一旦next的返回对象的done为true， for...of就会中止循环
```

for...of练习

```js
1、
function* foo() {
  yield 1;
  yield 2;
  return 3;
  yield 4;
  yield 5;
}

for (let v of foo()) {
  console.log(v);
}
```


## Generator.prototype.throw()

>向生成器抛出一个错误。

```js
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw();
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 undefined
// 外部捕获 b

```

>throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。

```js
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() 
g.throw() 
g.next() 
```

## Generator.prototype.return()
>返回给定的值并结束生成器。
```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

// return 提供参数
g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }

// return 不提供参数
g.next()        // { value: 1, done: false }
g.return() // { value: undefined, done: true }
```

## next()、throw()、return() 的共同点

>本质上三个方法都是同一件事，作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。

```js
const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
```


+ next()是将yield表达式替换成一个值。
```js
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
```

+ throw()是将yield表达式替换成一个throw语句。
```js
gen.throw(new Error('出错了')); // Uncaught Error: 出错了
```
+ return()是将yield表达式替换成一个return语句。
```js
gen.return(2); // Object {value: 2, done: true}
```

## Generator错误处理机制

1.构造体内部捕获
```js
function * F(){
   try{
     yield 1
   }catch(e){
     console.log(e)
   }
   yield 2
   yield 3
}
var f=F();
f.next();  //{value :1,done:false}
f.throw(new Error('test1'))  //{value:2,done:false}
f.next();  //{value:3,done:false}
```
2.在Generator构造体外部捕获错误
```js
function F(){
  yield 1;
  yield 2;
  return 3;
}
var f=F();
try{
  f.throw(new Error('test1'))
}catch(e){
  console.log(e)
}
// Error test1
```
3.如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。

```js
var gen = function* gen(){
  yield console.log('hello');
  yield console.log('world');
}

var g = gen();
g.next();
g.throw();
g.next()  // 中止Generator
// hello
// Uncaught undefined
```
throw练习
```js
function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());
```
##  委托代理yield*

>为什么要用委托呢？出于功能模块化等原因，我们很可能在一个生成器中调用另外一个生成器，比如在a()中调用b()，需要在函数体内手动完成便利，但是又多个Generator函数嵌套时，就会非常麻烦。ES6 提供了yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数

**yield*** **后 Generator(),字符串、数组、类数组以及ES6的Map、Set等**

```js
function *a() {
    console.log('a start');
    yield 2;
    console.log('a end');
}
function *b() {
    console.log('b start');
    yield 1;
    yield *a(); // 将a委托给b
    yield 3;
    console.log('b end');
}

let it = b();

it.next().value;    // b start
                    // 1 
it.next().value;    // a start
                    // 2
it.next().value;    // a end
                    // 3
it.next().value;    // b end


// 等同于
function *b() {
    console.log('b start');
    yield 1;
    for(let v of a()) {
        yield v
    }
    yield 3;
    console.log('b end');
}

```

yield*练习

```js
1、
let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();

read.next().value 
read.next().value 

2、
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

[...logReturned(genFuncWithReturn())]
```

## 含义

1.状态机

ES5写法
```js
var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}
```
Generator写法

```js
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
```

2.协程

Generator 函数是 ES6 对协程的实现，但属于不完全实现。Generator 函数被称为“半协程”（semi-coroutine），意思是只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

3.上下文

Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。


## 应用

### 部署Iterator接口关系

>**实现Iterator，为不具备 Iterator 接口的对象提供遍历方法。**

把Generator赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]

```

### 作为数据结构
>Generator可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为Generator函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口.  **for...of**


## Thunk函数
“传名调用”实现

thunk函数含义
```js
var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
```

js中Thunk函数
>Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数
```js
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
```

thunk转换器

```js
// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
```
Thunkify模块是生产环境的转换器，它的源码主要多了一个检查机制，变量called确保回调函数只运行一次。


执行器
```js

function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

```

## Co模块

>co 模块可以让你不用编写 Generator 函数的执行器。

```js
var co = require('co');
co(gen);
```

>co返回promise对象

```js
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});
```



