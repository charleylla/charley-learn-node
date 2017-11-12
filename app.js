const express = require("express")
const app = express();
const router = express.Router();
app.listen(8080,() => {
    console.log("服务已启动")
});

router.get("/",(req,res,next) => {
    res.send("Hello Node")
    // 在向浏览器做出响应后仍然可以使用 next 方法
    next()
},(req,res) => {
    console.log("do something else.")
});

// 对中间件进行组合，区分不同的业务逻辑
router.get("/home",[homeMid1,homeMid2],homeMid3);
function homeMid1(req,res,next){
    console.log("homeMid1")
    next()
}

function homeMid2(req,res,next){
    console.log("homeMid2")
    next()
}

function homeMid3(req,res){
    console.log("homeMid3")
    res.end("Done");
}

// 使用 route 处理路由请求
router.route("/user")
    .get((req,res) => {
        res.send("GET")
    })
    .post((req,res ) => {
        res.send("POST")
    })
    .put((req,res) => {
        res.send("PUT")
    })

app.use("/",router);