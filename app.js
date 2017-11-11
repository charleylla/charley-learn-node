// 引入 express
const express = require("express")
// 创建 express 对象
const app = express();
app.listen(8080);
// 处理 get 请求
app.get("/hello",(req,res) => {
    // 发送数据
    res.send("Hello World")
})

// 使用 req.query 对象获取 query string 键值对
app.get("/testQuery.html",(req,res) => {
    const { username } = req.query;
    // 根据传入的参数进行动态显示，也是传统后端所说的伪静态
    // 注意我们上面的 path 为 *.html，这就是伪静态的处理
    res.send(`欢迎你：${username}`);
});

app.get("/note",(req,res) => {
    // download 方法提供了下载操作，当用户访问 /note 路径时，会要求浏览器下载 node.txt 文件
    // 接受一个文件的路径参数，作为浏览器下载的资源文件
    res.download("./node.txt")
})

// req.params 用来获取 URL 参数
app.get("/testParams/:p1/:p2",(req,res) => {
    // 注意，虽然 p2 参数在 p1 参数的后面，但对于 params 对象而言，它们是同级的
    const { p1,p2 } = req.params;
    res.send(`参数一：${p1}<br>参数二：${p2}`)
})

// 使用 res.json 向客户端返回 JSON
app.get("/testJSON",(req,res) => {
    res.json({
        name:"于谦",
        major:"说相声",
        hobby:["抽烟","喝酒","烫头"]
    })
})

// 使用 res.redirect 进行重定向操作
app.get("/testRedirect",(req,res) => {
    // res.redirect("/testJSON")
    // 除了跳转到本站，还可以跳转到其他的站点
    res.redirect("http://www.baidu.com")
});

// 使用 express.static 中间件提供静态文件服务
app.use(express.static("public"))
