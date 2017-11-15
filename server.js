const Koa = require("koa")
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
// 获取命令行参数
const PORT = process.argv.splice(2)[0];
// 监听端口
app.listen(PORT);

router.get("/",async (ctx,next) => {
    ctx.body = `<h1>Server at ${PORT}</h1>`
});

app.use(router.routes());