const fs = require("fs");
// 阻塞代码示例
// readFileSync 方法是一个同步灯方法
function syncMethod(){
    const fdata1 = fs.readFileSync("./README.md")
    // console.log 方法会在文件读取完成之后再调用
    // console.log(fdata1);//输出十六进制格式的数据
    console.log(fdata1.toString());//将十六进制灯数据转换成字符串输出
}

// syncMethod();//输出 README.md 文件的内容

//一异步代码示例
// readFile 是一个非阻塞函数
function asyncMethod(){
    const fdata2 = fs.readFile("./README.md")
    // console.log 方法不会等待 readFile 方法执行完成
    console.log(fdata2) // undefined
}

// asyncMethod()

// 回调函数示例
function asyncMethocCb(){
    // readFile 方法接受一个回调函数作为参数，用来在文件被读取完成后进行调用
    const fdata3 = fs.readFile("./README.md",(err,data)=>{
        if(err){
            console.log("Something wrong!")
        }
        console.log(data.toString());
    })
}

asyncMethocCb()
// asyncMethodCb 方法不是阻塞的
// console.log 方法不会等待 asyncMethodCb 执行完成
console.log("代码执行完毕！")