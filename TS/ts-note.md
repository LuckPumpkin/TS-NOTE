# ts

## 声明数组

- **let arr:Array<any> =new Array<any>();**

- **let list: number[] = [1, 2, 3];**

## 获取对象中的某个值

- **this.dialog['resUrl']/window['xxx']**

## 声明变量需要放在@Component({})

```js

eg:const validatePass = (rule:any, value:string, callback:any) => {
      if (value!== "") {
        const reg = /^(\/[a-zA-Z]+)+$/
        const re = new RegExp(reg);
        if (re.test(value)) {
          callback();
        } else {
          callback(new Error('请写出正确的url！'));
        }
      }
    };
```

## enum (枚举类型)

```js
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```

## 踩坑纪录

```js
ts 监听路由
须在main.ts声明路由钩子函数
Component.registerHooks([
    'beforeRouteEnter',//进入路由之前
    'beforeRouteLeave',//离开路由之前
    'beforeRouteUpdate'
])
```
