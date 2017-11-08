// 引入 events 模块
const events = require("events");
// 创建一个事件对象
const eventEmitter = new events.EventEmitter();
// 绑定自定义事件
eventEmitter.on("myEvent",()=>{
    console.log("我是 myEvent 事件！")
})
// 一定时间后触发自定义事件
setTimeout(()=>{
    eventEmitter.emit("myEvent")
},2000)