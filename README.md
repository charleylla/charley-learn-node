# Generator
## 状态机
Generator 函数是一个状态机生成器，其内部保留了一系列的状态。

执行 Generator 函数会返回一个迭代器对象，通过调用迭代器对象的 ```next``` 方法可以进行取得内部封装的状态。
```
function* gen(){
    yield 1
    yield 2
    yield 3
}

const iter = gen();
console.log(iter.next()) //{ value: 1, done: false }
console.log(iter.next()) //{ value: 2, done: false }
console.log(iter.next()) //{ value: 3, done: false }
console.log(iter.next()) //{ value: undefined, done: true }
```
调用 ```gen``` 函数，返回了一个迭代器，每次调用迭代器的 ```next``` 方法都可以获取生成器内部生成的状态。在生成器函数内部，使用 ```yield``` 关键字来产出状态，在英语中，```yield``` 本身也具有“产出”之意。
## yield
调用 Generator 函数会生成一个迭代器对象（内部指针），每次调用迭代器对象指针会进行移动，这个移动的过程就是代码从一个 ```yield``` 向下一个 ```yield``` 执行的过程。

因此可以利用 ```yield``` 的这个特性来暂停函数的执行。 
```
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
```
每次调用 ```next``` 方法时，会从原先暂停的地方接着执行。
# yield 表达式
每次调用 ```next``` 方法获取的 ```value``` 值，实际上就是 ```yield``` 后面的表达式的返回值。

注：调用 ```next``` 方法获取的是 ```yield``` 关键字后面的表达式的值，而不是 ```yield``` 表达式的值。当我们说 ```yield``` 表达式的值时，我们是在说 ```yield``` 表达式整体的值。

如下有个例子：
```
function* gen(){
    yield 1
    yield 1 + 1
    yield 3 * 3
}

const iter = gen()
console.log(iter.next()) //{ value: 1, done: false }
console.log(iter.next()) //{ value: 2, done: false }
console.log(iter.next()) //{ value: 9, done: false }
```
由此，我们可以将 ```yield``` 表达式的值赋值给一个变量，然后在下一个 ```yield``` 中使用这个变量：
```
function* gen(){
    const first = yield 1
    const second = yield first + 1
    const third = yield second + 1
}
const iter = gen();
console.log(iter.next()) //{ value: 1, done: false }
console.log(iter.next()) //{ value: NaN, done: false }
console.log(iter.next()) //{ value: NaN, done: false }
```
这就很尴尬了，为啥 ```value``` 中有 ```NaN``` 呢？

造成 ```NaN``` 的原因是我们对 ```undefined``` 执行了加法操作。为什么会有 ```undefined``` 的出现呢？这是因为在默认情况下，```yield``` 表达式的值为 ```undefined```（注意 ```yield``` 表达式的值和 ```yield``` 后面表达式的值的区别，上面有做说明）。

我们可以用如下代码验证，默认情况下 ```yield``` 表达式的值都是 ```undefiend```：
```
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
```
上面代码的输出结果为：
```
first: undefined
second: undefined
third: undefined
```
现在我们知道了，调用 ```next``` 方法并不是获取的 ```yield``` 表达式的值，而是获取的 ```yield``` 关键字后面的表达式的值。

知道了这一点，我们就可以来看 ```next``` 方法的参数了。
## next 方法的参数
```next``` 方法的参数的意义在于：**其参数的值会代替上一条 ```yield``` 表达式的值**。也就是说，```yield``` 表达式的值实际上是由 ```next``` 方法的参数来决定，默认情况下不传入参数，其值就是 ```undefined```。

现在来看一下经过改进的例子：
```
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
```
值得注意的是，对于第一次调用 ```next``` 方法时传入的参数会被忽略，因为 ```next``` 方法的参数表示上一个 ```yield``` 表达式的值，在第一次调用 ```next``` 方法时是没有上一个 ```yield``` 表达式的，因此该参数会被忽略，传不传都可以。
## throw 方法
在迭代器外部，我们可以调用迭代器对象的 ```throw``` 向内部抛出错误，同时在迭代器内部使用 ```try...catch``` 进行错误捕获。
```
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
console.log(iter.next())
console.log(iter.next(2))
// 使用 throw 向迭代器内部抛出错误
console.log(iter.throw(new Error("Error")))
console.log(iter.next())
```
上面的代码中，第三次调用 ```next``` 方法时，本该对上一次的 ```yield``` 表达式的值进行加法操作，但我们使用 ```throw``` 方法手动抛出了一个错误，在迭代器内部如果不对该错误进行处理，错误会被全局作用域捕获，并中断后续代码的执行。

我们这里对错误进行了处理，使得我们能够正确得到上一次 ```yield``` 表达式的值，因而我们的迭代操作能够正常执行。

调用 ```next``` 和 ```throw``` 都可以使迭代器继续执行（如果 ```throw``` 抛出的错误被正确处理了的话）。

## 委托生成器
有时在一个生成器中可能需要使用别的生成器的内容，但又不想从头再写一次，就可以使用委托生成器。委托生成器的用法比较简单，一看便知：
```
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
```
运行结果为：
```
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 'Hello', done: false }
{ value: 'World', done: false }
{ value: undefined, done: true }
```
### 将委托生成器应用于可迭代对象
前面的应用的都是都是我们手动定义的迭代器，我们也可以将委托生成器应用在一些内置的可迭代对象上，这样就会调用这些内置可迭代对象的迭代方法：
```
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
```
上面代码的运行结果为：
```
{ value: 'H', done: false }
{ value: 'e', done: false }
{ value: 'l', done: false }
{ value: 'l', done: false }
{ value: 'o', done: false }
{ value: undefined, done: true }
```
