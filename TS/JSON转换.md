# JSON转换

## JSON.stringify()

```js
let arr = [1,2,3];
JSON.stringify(arr);//'[1,2,3]'
typeof JSON.stringify(arr);//string
```

## JSON.stringify()的妙用  

-.判断数组是否包含对象

```js
let data = [
    {name:'echo'},
    {name:'听风是风'},
    {name:'天子笑'},
    ],
    val = {name:'天子笑'};
JSON.stringify(data).indexOf(JSON.stringify(val)) !== -1;//true
```

-.判断对象/数组是否相等

```js
let a = [1,2,3],
    b = [1,2,3];
JSON.stringify(a) === JSON.stringify(b);//true
```

-.使localStorage / sessionStorage 可以存储对象

```js
//存
function setLocalStorage(key,val){
    window.localStorage.setItem(key,JSON.stringify(val));
};
//取
function getLocalStorage(key){
    let val = JSON.parse(window.localStorage.getItem(key));
    return val;
};
//测试
setLocalStorage('demo',[1,2,3]);
let  a = getLocalStorage('demo');//[1,2,3]
```

-.实现对象深拷贝

```js
function deepClone(data) {
    let _data = JSON.stringify(data),
        dataClone = JSON.parse(_data);
    return dataClone;
};
//测试
let arr = [1,2,3],
    _arr = deepClone(arr);
arr[0] = 2;
console.log(arr,_arr)//[2,2,3]  [1,2,3]
```

-.JSON.stringify()与toString()的区别

两者都可以将目标转化为字符串

```js
let arr = [1,2,3];
JSON.stringify(arr);//'[1,2,3]' // 受众多为对象
arr.toString();//1,2,3 // 不能对对象操作,受众多为数字
```

## JSON.parse()

```js
let string = '[1,2,3]';
console.log(JSON.parse(string))//[1,2,3]
console.log(typeof JSON.parse(string))//object
```
