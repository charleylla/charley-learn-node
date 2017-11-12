# Koa 简介
## 使用 Generator 提供中间件
Koa 中的中间件均使用 Generator 函数，当需要跳转到下一个中间件时，使用 ```yield next``` 实现跳转。在执行 ```yield next``` 语句时，当前中间件会暂停执行，将控制权移交给下一个中间件。当中间件栈中没有 ```yield next``` 语句时，会逆序从这些中间件栈函数内部的 ```yield next``` 之后继续执行函数。
## 响应
使用 Koa 进行数据响应时，只需将所需要响应的数据挂载到 ```this.body``` 上，Koa 会自动进行内容协商（确定 Content-Type）返回数据，如：
```
...
this.body = "Hello World"
...
```
同时，在使用 ```this.body``` 进行数据响应时，后面的响应会覆盖前面的响应，也就是只有一个响应能生效：
```
...
// 这条响应不会生效
this.body = "Hello World"
// 这条响应会生效
this.body = "End"
...
```
这一点和 Express 是有区别的，使用 Express 时，我们需要调用诸如 ```res.send```、```res.json```、```res.end``` 等方法进行响应操作。
## 多端口监听
使用 Koa，我们可以为应用配置多个端口，只需要调用 ```app.listen``` 就好了：
```
// 监听 8080 端口
app.listen(8080)
// 监听 3000 端口
app.listen(3000)
```
这样不论是访问 8080 还是访问 3000 端口都可以进入我们的应用了。这种特性对于我们构建集群应用很有帮助。
## 设置 Cookie
通过 ```app.cookies.set``` 方法可以进行 Cookie 设置：
```
this.cookies.set("test","koa")
```
## 设置 Cookie 签名
在设置 Cookie 时，也可以设置 Cookie 签名，设置带签名的 Cookie 时，需要首先设置签名秘钥，否则不会生成签名 Cookie。
设置签名秘钥时，将其挂载到 ```app.keys``` 上即可。
```
...
app.keys = ["myKeys1","myKeys2"]
...
this.cookies.set("test2","Koa",{
    secret:true
})
...
```
## 错误处理机制
当请求或相应的过程发生了错误时，Koa 会自动向客户端返回一个 500（Internal Server Error)，同时会执行错误事件的监听函数：
```
app.on("error",(err,ctx) => {
    console.log(err)
})
```