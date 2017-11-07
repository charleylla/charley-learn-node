# Node 中的回调
## 函数调用的三种形式
函数的调用分为三类：同步调用，异步调用和回调。
## 阻塞和非阻塞
阻塞和非阻塞关注的是程序在等待函数的调用结果时的状态。
- 阻塞：必须在前面的调用执行完成后再执行后面的调用
- 非阻塞：不用等待前面的函数调用完成，可以先做其他的事情，当前面的函数调用完成之后，再回过头对该函数的调用结果进行处理
## 非阻塞函数的处理
对于非阻塞函数，一般需要为其传入一个回调函数，用来在操作执行完成后调用：
```
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
```