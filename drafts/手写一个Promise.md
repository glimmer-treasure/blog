---
title: 手写一个Promise
tags:
---

# 手写一个Promise

最近阅读了Promises/A+规范，看过规范之后觉得可以自己实现一个Promise类，本篇文章记录了一下实现Promise的过程。本篇文章只是根据Promises/A+规范的要求进行实现并没有做太多的代码优化，当然代码写完之后是可以100%通过Promises/A+测试的。

下面我们将根据Promises/A+规范实现一个我们自己的Promise类—MyPromise

## Promise骨架

我们首先搭建一个Promise的框架然后根据Promises/A+规范一步一步向骨架中添加代码，最终形成一个能够通过Promises/A+测试的MyPromise类。

我们知道每个Promise实例可能是pendding、fulfilled、rejected状态之一，其次每个Promise实例都有两个能够改变Promise实例状态的函数resolve和reject。其中resolve函数能够将pendding状态转变为fulfilled状态，reject函数能够将pending状态转变为rejected状态。其次Promise的构造函数需要接收一个被称为exector的函数作为参数，这个函数在创建Promise实例的时候同步执行，并且这个函数需要接收Promise实例提供的resolve和reject这两个函数作为参数。所以我们的MyPromise类骨架如下：

```javascript
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  	state = PENDING
    resolve = () => {
    	this.state = FULFILLED
    }
    reject = () => {
      this.state = REJECTED
    }

    constructor(exector) {
        try {
            exector(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
}
```

在构造函数中我们用try...catch包围exector函数的执行，如果exector函数执行出错，那么这个Promise实例的状态将会变为rejected。其次之所以resolve和reject函数被声明为实例属性并且采用箭头函数是为了将这两个函数的this指向绑定为该Promise实例。

## Promise的状态

![Promise的状态](https://picture-glimmertreasure-com.oss-cn-hangzhou.aliyuncs.com/2.1%20Promise%20States.jpg)

上图为Promises/A+规范定义的Promise的状态。简单来说规范定义了Promise有pending、fulfilled、rejected三种状态。其中当Promise处于pending状态时，Promise可以转变fulfilled或者rejected状态。当Promise处于fulfilled状态时，Promise不能再转变为其他状态，并且有一个value，而且这个value不能再改变。当Promise处于rejected状态时，Promise也不能再转变为其他状态，并且有一个reason，这个reason也不能再改变。

所以根据规范所述，我们的MyPromise类做如下更改：

```javascript
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    state = PENDING
    value = null
    reason = null

    resolve = value => {
        try {
            if (this.state === PENDING) {
                this.value = value
                this.state = FULFILLED
            }
        } catch(e) {
            this.reject(e)
        }
    }
    reject = reason => {
        try {
            if (this.state === PENDING) {
                this.reason = reason
                this.state = REJECTED
            }
        } catch (e) {
            this.reject(e)
        }
    }

    constructor(exector) {
        try {
            exector(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }
}
```

这段代码主要为MyPromise实例增加了两个实例属性value和reason。其次是在resolve和reject函数中首先判断MyPromise实例是否是pending状态，只有处于pending状态的MyPromise实例才能继续改变状态。在resolve和reject函数中我们使用try...catch包围代码，一旦代码执行出错我们就需要将MyPromise实例转变为rejected状态。

## Promise.prototype.then函数

![2.2 The then Method](https://picture-glimmertreasure-com.oss-cn-hangzhou.aliyuncs.com/2.2%20The%20then%20Method.jpg)

Promise.prototype.then函数是Promise中最重要的函数之一，以上便是Promise/A+规范对then函数的定义
