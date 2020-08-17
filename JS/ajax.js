/*
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-05-21 11:56:19
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-05-21 16:19:36
 */ 


 //  原生js写ajax


/**
 * 
 * @param {readyState} options 
 * readyState 当前文档载入状态  状态改变触发onreadystatechange事件
 * 0 - 未初始化,还没调用send()
 * 1 - 载入,已调用send()方法
 * 2 - 载入完成,send()方法执行完成,已接收到全部响应内容
 * 3 - 交互,正在解析相应内容
 * 4 - 完成,响应内容解析完成,可以在客户端调用
 */

 /**
  * @param {status} options 
  * status: HTTP状态码
  * 1XX: 信息性状态码,请求正在处理； 
  * 2XX: 成功状态码,请求正常处理；
  * 3XX: 重定向状态码,需要附加操作来完成请求；
  * 4XX: 客户端错误,服务器无法处理请求；
  * 5XX: 服务器错误状态,服务器处理请求错误
  */
 import qs from 'qs';

export const ajax = (options) => {
    options = options || {}, // 未传参
    options.type = (options.type || 'GET').toUpperCase(); // 默认请求GET
    options.dataType = option.dataType || 'json';
    let xhr;
    // 超时处理
    setTimeout(()=>{
        if(xhr.readyState != 4) {
            xhr.abort();
        }
    }, options.timeout)
    // if(options.timeout && options.timeout > 0) {
    //     xhr.timeout = options.timeout
    // }

    // 兼容处理
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest
    } 
    if(window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 发送请求
    if(options.type === 'GET') {
        xhr.open("GET", options.url + '?' + qs.stringify(options.data), true);
        xhr.send(null);
    } else if(options.type === 'POST'){
        xhr.open('POST', options.url, true)

        // 设置表单提交内容形式 Content-type 数据请求格式
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(params);
    }
    
    // 接收
    xhr.onreadystatechange = ()=> {
        if(xhr.readyState === 4) {
            const status = xhr.status
            if(status >= 200 && status < 300 || status === 304) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.error && options.error(status)
            }
        }
    }

}