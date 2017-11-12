// 引入 koa
const koa = require("koa");
// 创建 app 实例
const app = koa();
// 监听端口
app.listen(8080);
// 多端口支持
app.listen(3000);

app.keys = ["myKeys1","myKeys2"]

app.use(function* (){
    // 返回数据，直接将返回的数据挂载到 this.body 上
    // this.body = "Hello World"
    // 只有最后一条数据会生效
    // this.body = "End"

    // 设置 cookie
    this.cookies.set("test","node")
    // 设置带签名的 Cookie
    this.cookies.set("test2","Koa",{
        secret:true
    })

    // Koa 会自动进行内容协商，并设置相应的编码
    this.body = {
        name:"老王",
        address:"隔壁"
    }

    这里搞点事情
})

// 错误处理
app.on("error",(err,ctx) => {
    console.log(err)
})