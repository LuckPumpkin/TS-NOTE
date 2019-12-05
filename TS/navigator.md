# webRTC

## 视频通话

webrtc 用到 navigator.mediaDevices 抓取屏幕流，主要是在chrome中调试，用网页来实现这个功能，
本地打印navigator.mediaDevices存在，
服务器中打印navigator.mediaDevices 为 undefined，微软的edge浏览器是能找到个对象

## 解决方案

解决方案： 用Https协议的方式请求网页可以找到navigator.mediaDevices(收集ICE信息?)

## canvas截图

```js
<video id="remoteVideo" style="width= 100%; height=100%; object-fit: fill" autoplay muted playsinline></video>
<canvas id="remote-canvas"> </canvas>

function videoCut($video, $canvas, imgBase64) {
  // 截图
  $canvas
  .getContext('2d')
  .drawImage($video, 0, 0, $video.videoWidth, $video.videoHeight);
  imgBase64 = $canvas.toDataURL('image/jpeg');
}

// 视频截帧
function videoCutFrame() {
    const $video = document.getElementById('remoteVideo');
    const $canvas = document.getElementById('remote-canvas');
    let imgBase64 = null;
    // 应每3秒截屏一次
    this.videoCut($video, $canvas, imgBase64);
  }
```

## 定时器设置与移除

```js
  设定 let listenerPair = setInterval(() => {},3000)
  移除 clearInterval(listenerPair);
```
