const express = require("express");
// 生成应用对象
const app = express()
// 生成路由对象
const router = express.Router();
app.listen(8080,() => {
    console.log("服务已启动")
});

// // 这是一个应用级中间件，在不指定路径的情况下，所有的请求都会流入这个中间件
// // 一般而言，我们把这种中间件放在所有的请求处理之前，以便对所有的请求进行控制
// app.use((req,res,next) => {
//     console.log("I'm the first of the first!")
//     // 同普通中间件，在执行完处理过程后，也需要调用 next 方法移交控制权
//     // 否则请求会挂起
//     next()
// })

// // 如果给 use 方法传递了路由，那么在所有处理该路由的请求中都会经过此中间件
// app.use("/",(req,res,next) => {
//     console.log("俺是设置了路由的应用级中间件")
//     next()
// })

// // 在处理请求时，可以经过多个中间件
// app.get("/",[mid1,mid2]);

// function mid1(req,res,next){
//     // 在 mid1 中间件中，对 req 进行了一些包装处理
//     req.tempData = "Hello"
//     // 使用 next 方法将控制权交给下一个中间件
//     // 如果前一个中间件没有对请求进行终结，必须调用 next 方法将控制权传递给下一个中间件
//     // 否则请求会挂起
//     next()
// }

// function mid2(req,res){
//     // 使用上一个中间件包装的数据
//     const { tempData } = req;
//     res.send(`${tempData},World`)
// }

// 将 /hello 请求挂载到 router 上
// 路由级中间件的使用方式和应用级中间件一致
// router.use((req,res,next) => {
//     console.log("我是第一个 router 级中间件")
//     next()
// })

// router.get("/hello",(req,res) => {
//     res.send("Hello Node")
// })

// app.use("/",router)

router.use("/",(req,res) => {
    这里故意出一点儿错误
})

// 使用错误处理中间件
router.use((err,req,res,next) => {
    console.log("错了一点错误")
    res.send("你猜怎么的？我发生了一些错误")
})

// 当然，我们也可以把错误挂载到 app 上
// app.use((err,req,res,next) => {
//     console.log("错了一点错误")
//     res.send("你猜怎么的？我发生了一些错误")
// })


// app.use("/",router)

// 引入 cookieParser 对象
const cookieParser = require("cookie-parser");
// 使用 cookieParser 中间件
app.use(cookieParser())
app.get("/",(req,res) => {
    console.log(req.cookies)
    res.json(req.cookies)
})