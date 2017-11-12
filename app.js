const express = require("express")
const app = express()
const router = express.Router()

app.listen(8080,() => {
    console.log("服务已启动")
})

router.route("/")
    .get((req,res) => {
        这里故意搞点儿错误
    })

app.use("/",router);

// 定义错误处理中间件
// 日志处理
app.use(logHandler)
// 客户端处理
app.use(clientHandler)
// 捕获所有错误
app.use(errorHandler)

function logHandler(err,req,res,next){
    console.log(err.stack);
    // 将错误传递给下一个中间件
    next(err);
}

function clientHandler(err,req,res,next){
    // 针对 ajax 请求进行处理
    if(req.xhr){
        res.send("发生了一点错误！")
    }
    next(err)
}

function errorHandler(err,req,res,next){
    res.send("你的系统挂了！")
}