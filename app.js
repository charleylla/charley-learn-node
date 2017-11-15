;(function(){
    function* gen(){
        yield 1
        yield 2
        yield 3
    }

    const iter = gen();
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
})
// ();

;(function(){
    function* gen(){
        console.log(1)
        yield
        console.log("=============")
        console.log(2)
        console.log("=============")
        yield
        console.log(3)
    }   

    const iter = gen();
    iter.next();
    iter.next();
    iter.next();
})
// ();

;(function(){
    function* gen(){
        yield 1
        yield 1 + 1
        yield 3 * 3
    }

    const iter = gen()
    console.log(iter.next()) //{ value: 1, done: false }
    console.log(iter.next()) //{ value: 2, done: false }
    console.log(iter.next()) //{ value: 9, done: false }
})
// ();

;(function(){
    function* gen(){
        const first = yield 1
        const second = yield first + 1
        const third = yield second + 1
    }
    const iter = gen();
    console.log(iter.next()) //{ value: 1, done: false }
    console.log(iter.next()) //{ value: NaN, done: false }
    console.log(iter.next()) //{ value: NaN, done: false }
})
// ();

;(function(){
    function* gen(){
        const first = yield 1
        console.log("first:",first)
        const second = yield 1 + 1
        console.log("second:",second)
        const third = yield 2 + 1
        console.log("third:",third)
    }
    const iter = gen();
    iter.next()
    iter.next()
    iter.next()
    iter.next()
})
// ();

;(function(){
    function* gen(){
        const first = yield 1
        const second = yield first + 1
        const third = yield second + 1
    }
    const iter = gen();
    console.log(iter.next(1)) //{ value: 1, done: false }
    console.log(iter.next(2)) //{ value: 3, done: false }
    console.log(iter.next(3)) //{ value: 4, done: false }
    console.log(iter.next(4)) //{ value: undefined, done: true }
})
// ();

;(function(){
    function* gen(){
        const first = yield 1
        let second;
        // 迭代器内部可以使用 try...catch 进行错误捕获
        try{
            second  = yield first + 1
        }catch(e){
            console.log(second) // undefined
            second = 3; 
        }
        const third = yield second + 1
    }
    const iter = gen();
    console.log(iter.next()) //{ value: 1, done: false }
    console.log(iter.next(2)) //{ value: 3, done: false }
    // 使用 throw 向迭代器内部抛出错误
    console.log(iter.throw(new Error("Error"))) //{ value: 4, done: false }
    console.log(iter.next()) //{ value: undefined, done: true }
})
// ();

;(function(){
    function* genNum(){
        yield 1
        yield 2
    }

    function* genStr(){
        yield "Hello"
        yield "World"
    }

    function* gen(){
        yield *genNum()
        yield *genStr();
    }

    const str = gen();
    console.log(str.next())
    console.log(str.next())
    console.log(str.next())
    console.log(str.next())
    console.log(str.next())
})
// ();

;(function(){
    function* gen(){
        yield *"Hello"
    }
    const iter = gen();
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
})
();