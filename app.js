const express = require("express")
const app = express()
// 页面路由
const router = express.Router();
// 接口路由
const routerAPI = express.Router();
const bodyParser = require("body-parser");
// 引入 swig 模板
const swig = require("swig");
// 设置模板引擎
app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/views");

// 使用 body-parser
app.use(bodyParser.urlencoded({ extended: false }))

// 设置静态文件夹
app.use(express.static("public"))

// 数据库连接

const mysql = require("mysql");

// 使用一对一连接
// const conn = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"123456",
//     database:"db_node_express"
// });

// 使用数据库连接池
const conn = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"db_node_express"
});

// 连接数据库
// 当使用数据库连接池时，无需执行 connect 方法
// conn.connect((err) => {
//     if(err){
//         throw new Error("mysql connect failed!")
//     }
//     console.log("数据库连接成功")
// });

// 主页路由
router.get("/",(req,res) => {
    // 渲染 views 下的 index.html
    res.render("index")
})

// API 路由，REST 风格
routerAPI.route("/user")
    .post((req,res) => {
        const user = req.body;
        const { username } = user;
        // 非空判断
        if(!username){
            res.status(400);
            res.json({
                code:0,
                msg:"用户名不能为空"
            })

            throw new Error("用户名不能为空")
        }
        console.log(user)
        // 向数据库插入数据
        conn.query("INSERT INTO tb_user SET ?",user,(err,results,fields) => {
            // 写入数据库出错
            if(err){
                console.log(err)
                res.status(400);
                res.json({
                    code:0,
                    msg:"Failed"
                });
                throw new Error("插入数据失败！")
            }
            // console.log("====================")
            // console.log(results)
            // console.log("====================")
            // console.log(fields)
            // console.log("====================")
            // console.log(conn.sql)
            res.json({
                code:1,
                msg:"Success"
            })
        })
    })

// 应用路由设定
app.use("/",router);
app.use("/api",routerAPI)

// 错误处理
app.use((err,req,res,next) => {
    console.log(err.stack)
})

app.listen(8080,() => {
    console.log("服务已启动！");
});