# 路由
## controller / action
标准的路由设定应该是由一个个的 controller 和 action 组成的，一个 controller 下可能会带有多个 action。
如：home/index，home/about，home/join 等。
## next 的执行时机
在执行 ```send``` 或其他终结请求的方法后，还是可以执行 ```next``` 方法进行控制权移交。并不意味着 ```send``` 等方法是整个处理流程的终结，只是向浏览器响应的终结，在结束浏览器响应后，还是可以进行后续的处理，如收尾工作、日志打印等。
```
router.get("/",(req,res,next) => {
    res.send("Hello Node")
    // 在向浏览器做出响应后仍然可以使用 next 方法
    next()
},(req,res) => {
    console.log("do something else.")
});

app.use("/",router);
```
## 中间件的组合
在书写中间件时，我们可以将特定的功能块进行组合，就像这样：
```
...
router.get("/home",[mid1,mid2],[mid3,mid4])
...
```
本质上，进行组合与否并不会影响代码的底层执行，但是让我们的业务逻辑变得更清晰了。
```
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
```
## route 方法
该方法可挂载到 ```app``` 对象或者 ```router``` 对象上，用来对某个路由请求进行响应。使用 ```route``` 方法可以很方便的让我们构建 RESTful API。
```
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
```
如果采用传统方式，我们会这样做：
```
router.get("/user",...)
router.post("/user",...)
router.put("/user",...)
```
可见，使用 ```route``` 方法进行 RESTful 的处理更加直观方便。
