<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-08-03 18:03:38
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-08-06 13:41:44
--> 
# async/await

首先看个例子

Generator
```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

用async改写
```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

## async/await 在干什么

>从字面意思来理解。async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

1、async

>async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

基本案例
```js
async function timeout() {
    await 'hello world'
}
console.log(timeout());
console.log('虽然在后面，但是我先执行');
```

改进
```js
async function timeout() {
    return await 'hello world'
}
timeout().then(result => {
    console.log(result);
})
console.log('虽然在后面，但是我先执行');
```

async函数多种形式
```js
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```
2、await

>正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```js

// await命令后面是一个thenable对象（即定义了then方法的对象）
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();
// 1000
```
### 错误处理
任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

解决:
+ 将失败的步骤放入tr...Catch
```js
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}
```
+ await后的promise对象再跟一个catch方法
```js
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```
+ 多个await命令，可以都放入try...catch中
```js
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
```

## 使用注意点
1.错误处理(同上)

2.若多个await异步操作不存在继发关系，最好可以同时执行
```js
let foo = await getFoo();
let bar = await getBar();

// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```
3.await只能用在async函数中
```js
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}
```

练习

+ 可以如何修改下上述错误呢？

4.保留运行栈
```js
const a = () => {
  b().then(() => c());
};
```

练习

+  改进上述函数

## async函数实现原理
将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

spawn函数

```js

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });  
  });
}

```

## Promise **Vs** Async

```js
// promise
const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
    })

makeRequest()
```

```js
// async
const makeRequest = async () => {
  console.log(await getJSON())
  return "done"
}

makeRequest()
```

>1.简洁


>2.async/await让try/catch 可以同时处理同步和异步错误。
```js
// promise
const makeRequest = () => {
  try {
    getJSON()
      .then(result => {
        // JSON.parse可能会出错
        const data = JSON.parse(result)
        console.log(data)
      })
      // 取消注释，处理异步代码的错误
      // .catch((err) => {
      //   console.log(err)
      // })
  } catch (err) {
    console.log(err)
  }
}

// async
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = await getJSON()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
```

>3.条件语句

```js
const makeRequest = async () => {
  const res = await getJSON()
  if (res.code == '00000') {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}
```

>4.中间值
