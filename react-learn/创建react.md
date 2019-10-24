# 创建react项目

正常步骤：

```js
cnpm install -g create-react-app
create-react-app my-app
cd my-app/
npm start
```

## 初始化报错

```js
error @typescript-eslint/eslint-plugin@2.3.2: The engine "node" is incompatible with this module. Expected version
"^8.10.0 || ^10.13.0 || >=11.10.1". Got "11.7.0"
error Found incompatible module.
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
```

## 错误原因及解决

  -.node版本不兼容导致,可以升降node版本解决
  -.不升降版本解决方案

  ```js
  //  --use-npm 强制使用npm
  npx create-react-app my-app  --use-npm
  ```
