const http = require("http")

// Node 作为客户端
function makeClient(){
    // 请求参数配置
    const options = {
        host:"www.baidu.com",
    }

    // 使用 http 模块下的 request 方法可以向别的服务器发起请求，从而作为客户端使用
    const req = http.request(options,(response) => {
        let body = ""
        // 监听 response 对象上的事件
        // 当 response 接收到数据时会触发 data 事件
        response.on("data",(data) => {
            // 对请求到的数据进行拼接
            body += data;
        })

        // 当 response 接受数据完成时会触发 end 事件
        response.on("end",() => {
            console.log("数据接收完成：")
            console.log(body)
        })
    });
    // 调用 end 方法表示请求发送完成
    // 如果不调用该方法将一直处于等待状态
    req.end()
}

makeClient()
