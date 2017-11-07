const http = require("http")
http.createServer((req,res)=>{
    // 设置请求头
    res.writeHead(200,{"Content-Type":"text/plain"})
    // 返回数据
    res.end("Hello World")
}).listen(8080);
