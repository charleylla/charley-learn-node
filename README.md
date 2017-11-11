# Express
Express 是一个常用的 Node 服务端框架，可以用来快速构建 Node 应用功能程序。
## 安装 Express
这里直接安装使用的是 express@4.x 的版本：
```
yarn add express -S
```
## Express 常用的几个插件
Express 下有如下几个常用的插件，我们可以根据自己的选择进行安装：
- body-parser：用来处理 JSON、Raw、Text 和 URL 编码的数据
- cookie-parser：用来解析 cookie，可以通过 req.cookie 来获取客户端传递的 cookie
- multer：用来处理表单数据（enctype="multipart/form-data"）

安装：
```
yarn add body-parser cookie-parser multer -S
```
## 使用 supervisor 管理 Node 程序
通常我们在修改 Node 程序代码后，需要手动重启服务，有了 supervisor 这个插件后，就可以在文件发生变化后自动重启了。
```
npm install supervisor -g
```
安装完成后，我们可以使用 ```supervisor``` 命令启动 Node 程序，如：
```
supervisor app.js
```
## req 和 res 对象
Express 对 ```req``` 和 ```res``` 对象进行了一层包装，让我们更方便的获取请求相关的信息以及对响应操作提供了便利。
## req.query 对象
```req.query``` 对象对 URL 的 query string 进行了一层包装，使用此对象我们可以方便的获取 query string 查询的键值对。
```
const { username } = req.query
```
## req.params 对象
```req.params``` 对象提供了对 URL 地址的参数的访问入口。
```
app.get("/testParams/:p1/:p2",(req,res) => {
    const { p1,p2 } = req.params;
    res.send(`参数一：${p1}<br>参数二：${p2}`)
})
```
注意，虽然 p2 参数在 p1 参数的后面，但对于 params 对象而言，它们是同级的。

## res.download 方法 
顾名思义，该方法为浏览器提供了下载操作，通过此方法可以让浏览器下载某一个文件。
```
...
    res.download("./note.txt")
```
## res.json 方法
顾名思义，```json``` 方法用来向客户端返回一个 JSON：
```
app.get("/testJSON",(req,res) => {
    res.json({
        name:"于谦",
        major:"说相声",
        hobby:["抽烟","喝酒","烫头"]
    })
})
```
## res.redirect 方法
该方法用来进行重定向：
```
app.get("/testRedirect",(req,res) => {
    // res.redirect("/testJSON")
    // 除了跳转到本站，还可以跳转到其他的站点
    res.redirect("http://www.baidu.com")
});

```
## 静态文件服务
Express 也可以很方便提供静态文件服务，这就需要使用到框架内置的 ```express.static``` 中间件：
```
// 将 public 目录作为静态资源目录
app.use(express.static("public))
```