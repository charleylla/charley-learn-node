const koa = require("koa")
const app = koa()
app.listen(8080)
// app.use(function* (){
//     // 输出 request 对象
//     // console.log(this.request)
//     // console.log("=================")
//     // 输出响应前的 response 对象
//     // console.log(this.response)
//     this.body = "Hello World"
//     // 输出响应后的 response 对象
//     // console.log(this.response)
//     // 输出原生 req 对象 
//     console.log(this.req)
//     console.log("=================")
//     // 输出原生的 res 对象
//     console.log(this.res)
// })

app.use(function* (){
    // 抛出错误，支持下列集中组合
    // 自定义提示信息
    // this.throw(404,"Not Found")
    // this.throw("你猜？",404)
    // 使用规范的提示信息
    // this.throw(403)
    this.throw("你猜怎么得？你的服务 Down 掉了！")
})