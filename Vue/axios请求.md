<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2019-12-05 16:49:39
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-08-17 11:02:12
 -->
# axios请求返回图片流 转换成图片 并将返回头作为参数传给后端

```html
<img :src="codesrc" @click="getImgCode" class='br_img'>
```
#### 实现方法
```js
async getImgCode(){
    this.codesrc = `/code?code=${new Date()}`
    const res = await axios.get(`/code?code=${new Date()}`)
    console.log(res)
    const { headers: { randomstr = '' } } = res
    console.log(randomstr)
}
```

2.
```js 
async getImgCode() {
	const res = await axios.get(`/code?code=${new Date()}`, {
	    responseType: "arraybuffer"
	})
	const { headers: { randomstr = '' } } = res
	this.codesrc = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => {   // btoa创建一个base-64编码的字符串
		return data + String.fromCharCode(byte)   // fromCharCode 可接受一个指定的Unicode,然后返回一个字符串
	}, ''))
}
```

3.
```js
getImgCode(){
	axios
	.get(`/code?code=${new Date()}`, {
		responseType: 'arraybuffer'
	})
	.then(response => {
		this.randomStr = response.headers.randomstr;
		return 'data:image/png;base64,' + btoa(
		new Uint8Array(response.data)
			.reduce((data, byte) => data + String.fromCharCode(byte), '')
		);
	}).then(data => {
		this.codesrc = data
	})
}
```