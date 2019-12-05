<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2019-12-05 16:49:39
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2019-12-05 16:57:07
 -->
# axios请求返回图片流 转换成图片 并将返回头作为参数传给后端

1.
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
const res = await axios.get(`/code?code=${new Date()}`, {
    responseType: "arraybuffer"
})
    const { headers: { randomstr = '' } } = res
    this.codesrc = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => {
    return data + String.fromCharCode(byte)
}, ''))
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