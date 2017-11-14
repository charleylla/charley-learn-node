# Node 爬虫系统
## 一些依赖的包
构建爬虫系统时，使用一些第三方的包可以简化我们的操作，这里介绍两个相关的包：request 和 cheerio，首先来安装它们：
```
yarn add request cheerio -S
```
## request 的基本使用 —— 爬取百度内容
基本使用如下：
```
request("http://www.baidu.com",(err,res,body) => {
    if(err){
        throw new Error("爬取失败")
    }
    if(res.statusCode == 200){
      doSomething()
    }
});
```
## cheerio 的基本使用
获取到页面的 DOM 结构只是开始，更多的工作是需要对页面 DOM 结构进行分析，提取所需要的信息。cheerio 这个库就可以帮助我们提取这些信息。

使用 cheerio 时，需要先装载对应的 HTML 内容：
```
const $ = cheerio.load(body)
...
```
这里使用 ```$``` 作为装载对象的变量名，是因为该对象上的方法和 jQuery 很相似，可以像操作 jQuery 一样的操作（获取）爬取的 HMTL 页面的 DOM 结构。 