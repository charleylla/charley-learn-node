;(function(){
    console.log(1)
    new Promise(res => {
        res();
    }).then(resData => {
        // then 相当于 Promise 的回调函数，会在当前同步线程运行完成之后再进行
        console.log(2)
    });
    console.log(3)
    // 输出 1 3 2
})
// ();


// relove 一个 promise 对象，实现状态替换
;(function(){
    // 在 resolve 时可以传入另一个 Promise 对象
    const p1 = new Promise((res,rej) => {
        setTimeout(() => {
            res("Success P1");
        }, 2000);
    });

    // p2 resolve 了 p1，那么 p2 的状态就决定于 p1 的状态
    // 此时 p2 的状态就变成了 p1 的状态，引入 p2 的 then 中的 res 参数就是 p1 resolve 的参数
    const p2 = new Promise((res,rej) => {
        setTimeout(() => {
            res(p1)
        },1000)
    })

    p2.then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
})
// ();

// resolve 或者 reject 后并不会中断当前函数的执行
;(function(){
    new Promise(res => {
        res("hello");
        console.log("memeda")
    }).then(data => {
        console.log(data);
    })
    // 输出 memeda hello
    // resolve 或者 reject 后并不会中断当前函数的执行
})
// ();

// 如果在 resolve 或者 reject 之前 return，那么就不会发生状态改变，也就不会执行 then 了
;(function(){
    new Promise(res => {
        return false;
        res("hello")
    }).then(data => {
        console.log(data)
    })
})
// ();

;(function(){
    const p = new Promise(res => {
        setTimeout(() => {
            res( {code:1,msg:"Success"} )
        }, 500);
    });

    p.then(data => {
        console.log(data)
        // 返回第二个 Promise，就可以链式调用 then 方法
        // 在 then 中返回另一个 Promise 对象，就可以在该 Promise 对象状态改变后调用下一个 then 中的回调函数
        // 如果 resolve，就会调用 then 中的 resolve 回调
        // 如果 reject，就会调用 then 中的 reject 回调

        // 当我们要处理多重回调时，就在状态改变后，在 then 中返回另一个 Promise，这样就避免了多重的回调嵌套
        // 后一个 then 中的回调函数，会在前一个 Promsie 的状态改变后再调用
        return new Promise((res,rej) => {
            setTimeout(() => {
                const flag = Math.random() > 0.5;
                if(flag) res("Success");
                else rej("Failed")
            }, 1000);
        })
    }).then((succData) => {
        console.log(succData)
    },(failData) => {
        console.log(failData)
    });
})
// ();

// 使用 catch 捕获错误
;(function(){
    const p = new Promise(res => {
        // 在 Promise 内部抛出一个错误
        throw new Error("Error!")
    })

    // 使用 catch 捕获错误
    p.catch(err => {
        console.log(err)
    })
})
// ();

// 使用 then(null,err) 捕获错误
;(function(){
    const p = new Promise(res => {
        // 在 Promise 内部抛出一个错误
        throw new Error("Error!")
    })

    // 使用 then(null,err) 捕获错误
    p.then(null,err => {
        console.log(err)
    })

    // 因此，catch(err) 方法相当于 then(null,err) 的一个简写
})
// ();

// 两种抛出错误的方式
;(function(){
    const p1 = new Promise((res,rej) => {
        // 在 Promise 内部使用 try...catch 代码块捕获错误
        try{
            throw new Error("Error in p1")
        }catch(e){
            // 使用 reject 向外传递错误
            rej(e)
        }
    })
    // 使用 catch 捕获 p1 中的错误
    p1.catch(err => {
        console.log(err)
    });

    const p2 = new Promise((res,rej) => {
        // 在 Promise 中直接抛出错误，就可以在 catch 中捕获
        throw new Error("Error in p2")
    });
    p2.catch(err =>{
        console.log(err)
    });

    // 上面两种方式都可以用来抛出错误，第二种方式更为简洁一些
})
// ();

// 状态改变后再抛出错误无效
;(function(){
    const p = new Promise(res => {
        res();
        throw new Error("Error")
    })

    p.catch(err => {
        console.log(err)
    })
})
// ();

// 不使用 then 的第二个回调函数是一种最佳实践
;(function(){
    const p = new Promise((res,rej) => {
        rej("Error in p")
    }).then(data => {
        // then 中的第一个回调函数只用来处理 resolve 的数据
        // 不建议 then 中的第二个（失败）回调函数
        console.log(data)
    }).catch(err => {
        // 错误处理放在 catch 中
        console.log("Error:")
        console.log(err)
    })
})
// ();

// 在 catch 中返回一个 Promise 对象，状态改变后仍然可以执行后续的 then 方法
;(function(){
    const p = new Promise((res,rej) => {
        rej("Error in p")
    }).then(data => {
        console.log(data)
    }).catch(err => {
        console.log("Error:")
        console.log(err);
        // 在 catch 中返回一个 Promise 对象
        // 用以在抛出异常后进行重新请求啥的
        return new Promise((res,rej) => {
            res("Success in catch Promise")
        })
    }).then(res => {
        console.log(res)
    })

    // 一般而言，一个 then 中紧接一个 catch，用以进行异常捕获
})
// ();

;(function(){
    const p = new Promise((res,rej) =>{
        const flag = Math.random() > 0.5;
        if(flag) res("Success");
        else rej("Falied")
    }).then(data => {
        console.log("1",data)
        // 当前面的 Promsie 状态 resolve 会执行此回调
        // 该回调执行后会返回一个新的 Promsie 对象，该对象会被后面的 then 捕获
        return new Promise((res,rej) => {
            res("Success 2");
        })
    }).catch(err => {
        // 虽然没有明确的返回一个 Promise，但是当 catch 到错误后，仍会导致后面的 then 捕获
        console.log("0",err)
    }).then((data) => {
        console.log("1",data)
    });
    // 此段代码输出的两种结果：
    /**
     * 0 Falied
     * 1 undefined
     * 或：
     * 1 Success
     * 1 Success 2
     */
})
// ();

// Promise.all 方法
// 该方法用接受多个 Promsie 对象，返回一个被包装的新的 Promsie
// 当内部所有的 Promsie 都 resolve 或者有一个 Promsie 变为 reject 后，这个新包装的 Promise 对象才会发生状态改变
// 通常可以用此方法来进行并行请求
;(function(){
    const p1 = new Promise((res,rej) => {
        setTimeout(() => {
            const flag = Math.random() > 0.5;
            if(flag) res("Data in p1");
            else rej("Error in p1");
        },1000)
    });

    const p2 = new Promise((res,rej) => {
        setTimeout(() => {
            const flag = Math.random() > 0.5;
            if(flag) res("Data in p2");
            else rej("Error in p2");
        },2000)
    })

    // 使用 Promise.all 包装一个新对象
    const pAll = Promise.all([p1,p2])
    // 当内部的所有 Promise 对象都 resolve 或者有一个 reject 后，pAll 的状态发生变化
    // pAll 的 resolve 回调函数的参数为一个数组，其中保存了内部 Promsie 对象 resolve 的值
    pAll.then(([data1,data2]) => {
        console.log(data1)
        console.log(data2)
    }).catch((err) => {
        // 当有一个 Promsie 变成 reject 时，就会触发 catch 中的回调
        console.log(err)
    })
})
// ();

// Promsie.race 方法
// 同 Promise.all 方法，该方法接受多个 Promise 数组，返回一个经过包装的 Promsie
// 顾名思义，这是内部的多个 Promise 进行竞赛，只要有一个 Promise 发生了状态改变，这个经过包装的 Promsie 就会发生状态改变
// 该方法可以用来在验证某个 API 请求是否在某个时间段内完成，如果完成了就 resolve，否则就 reject
// 贴上阮一峰的代码：
;`
const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
    })
]);
p.then(response => console.log(response));
p.catch(error => console.log(error));
`
;(function(){
    const p1 = new Promise((res,rej) => {
        setTimeout(() => {
            res("P1 Success")
        },2000);
    });

    const p2 = new Promise((res,rej) => {
        setTimeout(() => {
            res({code:-1,msg:"Timeout!"})
        },1000);
    });

    const pRace = Promise.race([p1,p2]);
    pRace.then(data => {
        if(data.code === -1){
            console.log(data.msg)
            return;
        }
        console.log(data)
    });
    pRace.catch(err => {
        console.log("Error:",err)
    });
})
// ();

// Promise.resolve 方法
// 该方法用来将一个普通对象装换为 Promise 对象
// 关于 Promise.resolve 方法，接受的参数，有几种不同的情况
;(function(){
    // 1.参数为 Promsie 对象
    // 当参数为 Promise 对象时，原封不动的返回该对象
    const p1  = new Promise(res => res("p1 Success"));
    const p1Transfer = Promise.resolve(p1);
    p1Transfer.then(data => {
        console.log(data)
    })
    console.log(p1 === p1Transfer);

    // 2.参数是一个带有then 方法的对象
    // 将该对象转换为 Promsie 对象，并立即执行该对象的 then 方法
    const thenable = {
        then(res,rej){
            setTimeout(() => {
                res("Success thenable")
            },1000);
        }
    }
    const thenableTransfer = Promise.resolve(thenable);
    thenableTransfer.then(data => {
        console.log(data)
    });

    // 3.参数是不具有 then 方法的对象，或者不是对象
    // 返回一个理解 resolve 的对象，resolve 的参数就是这个参数对象
    const otherObj = {a:1}
    const otherObjTransfer = Promise.resolve(otherObj)
    otherObjTransfer.then(data => {
        console.log(data)
    });

    // 4.不带任何参数
    // 返回一个立即 resolve 的对象
    // 这个立即 resolve 是在本次事件循环结束时执行，而不是在下一轮循环开始时执行
    // setTimeout(fn,0) 是在下一轮循环开始时执行
    const resolvePromise = Promise.resolve();
    setTimeout(() => {
        console.log("=====>下次事件循环开始时执行")
    }, 0);
    resolvePromise.then(() => {
        console.log("=====>本次事件循环结束前执行")
    })

    // 执行结果：
    /**
     * =====>本次事件循环结束前执行
     * =====>下次事件循环开始时执行
     */

    // 使用 Promise.resolve 创建的立即 resolve 的对象，会在本次事件循环结束时执行，因此先输出
    // 使用 setTimeout(fn,0) 会在下次事件循环开始时执行，因此后输出
})
// ();

// Promsie.reject 方法
// 该方法返回一个立即 reject 的 Promise 对象
// 和 Promise.resolve 对象不同的是，传递给 Promise.reject 的任何参数都会原封不动的传入 catch 方法中
;(function(){
    const message = {
        code:-1,
        msg:"Failed"
    };
    
    const pReject = Promise.reject(message);

    pReject.catch(err => {
        console.log(err)
        console.log(err === message)
    })
})
// ();

// 不管同步还是异步的方法，都可以采用 promise 的方式去执行。
// 通过 then 指定下一步执行的方法。
;(function(){
    console.log("Start")
    const f = () => console.log("Hello Promise.");
    (async () => {
        f();
    })()
    .then((data) => {
        console.log(data)
    });
    console.log("End")
})
();
