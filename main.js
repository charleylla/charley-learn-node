// 引入文件模块
const fs = require("fs")

// 读取文件，异步版本
function asyncRead(){
    fs.readFile("./test.txt",(err,data) => {
        if(err){
            console.log("读取发生了错误！")
            return;
        }
        // data 是一个 Buffer 对象
        // console.log(data)
        console.log(data.toString())
    })
}

// asyncRead()


// 读取文件，同步版本
function syncRead(){
    const data = fs.readFileSync("./test.txt")
    // 同 readFile，这个 data 也是一个 Buffer 对象
    // console.log(data)
    console.log(data.toString())
}

// syncRead()

function openFile(){
    fs.open("./testOpen.txt","w+",(err,fd) => {
        if(err){
            console.log("创建文件失败！")
            return;
        }
        // fd 是文件描述符，通过此描述符可以对文件进行操作
        // 使用 writeFile 像新建的文件中写入数据
        fs.writeFile(fd,"好好学前端",(err) => {
            if(err){
                console.log("写入文件失败！")
                return
            }
            console.log("写入文件成功！")
        });
    })
}

// openFile();

function getFileStat(){
    fs.stat("./testStat",(err,stats) => {
        if(err){
            console.log("打开文件/目录失败！")
            return
        }
        // 判断是否为目录
        console.log("是否为目录：",stats.isDirectory())
        // 判断是否为文件
        console.log("是否为文件：",stats.isFile())
    })
}

// getFileStat();

function writeFile(){
    // 该方法可以像文件中写入文本类型或者其他二进制类型的数据
    fs.writeFile("./testWriteFile.txt",new Buffer(1023),(err) => {
        if(err){
            console.log("写入文件失败！")
            return
        }
        console.log("写入文件成功！")
    })
}

// writeFile();

function unLinkFile(){
    fs.unlink("./xx",(err) => {
        if(err){
            console.log("删除文件失败！")
            return;
        }
        console.log("删除文件成功！")
    })
}
// unLinkFile();

function makeDirectory(){
    // 该方法只支持创建以及目录，不支持创建多级目录
    fs.mkdir("./testMkDir",(err) => {
        if(err){
            console.log("创建目录失败！")
            return
        }
        console.log("创建目录成功！")
    })
}

// makeDirectory()

function readDirectory(){
    fs.readdir("./testReadDir",(err,files) => {
        if(err){
            console.log("读取文件目录失败！")
            return
        }
        // files 是一个文件列表数组
        files.forEach(console.log)
    })
}

// readDirectory()

function removeDirectory(){
    fs.rmdir("./xxx",(err) => {
        if(err){
            console.log("删除目录失败！")
            return;
        }
        console.log("删除目录成功！")
    })
}

removeDirectory()

