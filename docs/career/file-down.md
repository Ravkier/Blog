#### 文件下载的新玩法
##### 背景
> 服务端提供的接口方式是直接调用这个接口就会直接下载一个文件，导致我们需要用到请求响应的响应体拿不到。所以搞了一个新的方案
##### 思路
+ 选用 fetch请求
+ 拦截得到response的数据源可以通过不同方法进行处理
+ 接收下一个promise 进行函数处理
##### 介绍fetch
> 提供了一个获取资源的接口（包括跨域请求）,新的 API 提供了更强大和灵活的功能集
+ fetch 必须接收一个参数——资源的路径，无论请求成功与否，都会返回一个promise对象，resolve对应请求的response流
+ 第一个成功的promise 可以理解为是一个response流，这个流能获取到headers的信息，服务端会返回对应的请求头
+ 第二个promise是我们寻常请求返回的数据
##### response流
+ 用到response两个method: response.blob() response.json() 
+ 用到response中获取头信息 response.headers(获得[headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers)对象的方法，具体查看)

##### 具体实现
```js
//  针对文件
 function fileFetch(url, fileFn, jsonFn) {
    let isRun = null
    fetch(url).then(res => {
        const contentType = res.hearders.get('content-type')
        if(contentType.indexOf('json') >= 0) {
            isRun = jsonfn
            return res.json()
        } else {
            isRun = fileFn
            return res.bolb()
        }
    }).then(res => {
        isRun && isRun(res)
    })
 }
```
##### 思路拓展
+ 可以处理各种不同的场景
+ response中的method
    - arrayBuffer
    - blob
    - clone
    - error
    - formData
    - json
    - redirect
    - text