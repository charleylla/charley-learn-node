# Context（上下文）
## this
在使用 Express 时，```req``` 和 ```res``` 是作为回调函数的参数传入的，在 Koa 中，怎么获取 ```req``` 和 ```res``` 对象呢？

它们都被绑定到当前函数的上下文（this）上了，因此我们可以通过 ```this.request``` 或 ```this.response``` 来访问这些对象。
```
app.use(function* (){
    console.log(this.request)
    console.log("=================")
    console.log(this.response)
    this.body = "Hello World"
    console.log(this.response)
})
```
注意，在进行响应前后，```response``` 对象中的内容是不一样的哦，可以运行实例查看。
当前执行上下文上挂载的 ```request``` 和 ```response``` 对象都是经过 Koa 包装的对象，要想获取 Node 原生的 ```req``` 和 ```res``` 对象，可以直接使用 ```this.req``` 和 ```this.res``` 对象。
## 不支持直接调用底层 res 进行响应处理
Koa **不支持直接调用底层 ```res``` 进行响应处理**，因此请避免使用下面这些使用原生 ```res``` 处理的请求方式：
 -res.statusCode
- res.writeHead()
- res.write()
- res.end()

## 抛出错误
可以使用 ```this.throw``` 抛出错误，默认抛出 500 错误。支持以下集中处理方式：
```
// 自定义提示信息
this.throw(404,"Not Found")
this.throw("你猜？",404)

// 使用规范的提示信息
this.throw(403)

// 默认会抛出 500 错误
this.throw("你猜怎么得？你的服务 Down 掉了！")
```