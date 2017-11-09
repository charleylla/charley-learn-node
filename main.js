// __filename 全局变量
// 将会输出当前文件所在的绝对路径
console.log(__filename)

// __dirname 全局变量
// 将会输出当前文件所在的目录（绝对路径）
console.log(__dirname)

process.on("exit",()=>{
    console.log("程序即将退出！")
})