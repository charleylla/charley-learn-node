const http = require("http")
const url = require("url")
const fs = require("fs")

// node 作为服务端
function makeServer(){
    const server = http.createServer((req,res) => {
        const path = url.parse(req.url).pathname;
        console.log(path)
        // 根据 path 读取相应的文件
        // 这里获取的 path 前面有一个 /
        // 因此需要使用 substr 或者 substring 去掉 /
        fs.readFile(path.substr(1),(err,data) => {
            if(err){
                // 使用 UTF8 编码
                // UTF-8/UTF8/utf8/utf-8 都是可以的
                res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"})
                res.end(`
                    <h1>404 NOT FOUND！</h1>
                `);
            }
            res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"})
            res.end(data);
        })
    });
    
    
    server.listen(8080,() => {
        console.log("服务器已启动。")
    })
}

makeServer();