const express = require("express")
const app = express()
const router = express.Router();
app.listen(8080);

;(function(){
    // 引入 request 
    const request = require("request")
    
    router.get("/",(req,res) => {
        // 访问首页时使用 request 请求百度
        getBaidu((body) => {
            // 直接输出网页内容，我们就可以看到百度了
            res.send(body)
        });
    });

    function getBaidu(fn){
        request("http://www.baidu.com",(err,res,body) => {
            if(err){
                throw new Error("爬取失败")
            }
            // 获取信息成功后调用回调函数
            if(res.statusCode == 200){
                fn(body)
            }
        });
    }
    app.use("/",router)
})
// ();

;(function(){
    const request = require("request")
    // 引入 cheerio
    const cheerio = require("cheerio");

    router.get("/",(req,res) => {
        // 访问首页时使用 request 请求百度
        getBaidu(($,body) => {
            // 这里获取百度顶部的菜单信息
            const len = $("#u1>a").length;
            res.json({
                navLen:len
            });
        });
    });

    function getBaidu(fn){
        request("http://www.baidu.com",(err,res,body) => {
            if(err){
                throw new Error("爬取失败")
            }

            if(res.statusCode == 200){
                // 使用 cheerio 装载 HTML
                const $ = cheerio.load(body)
                // 装载后返回的对象拥有跟 jQuery 类似的方法
                fn($,body)
            }
        });
    }
    app.use("/",router)
})
()
;