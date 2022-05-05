(function (window) {
    function Promise(executor) {
        // 1. new Promise((resolve, reject) => {})
        // 传入一个函数，这个函数被立即执行，且这个函数还会立即执行resolve和reject

        // 2. 每个promise都有一个状态，可能为pending,或者resolved, rejected
        var self = this
        // 状态
        self.status = 'pending'
        // 3. 存储结果的 data
        self.data = undefined
        // 4. promise.then(resolve => {}, reject => {})
        self.callbacks = []

        // Promise函数对象的resolve方法，返回一个指定结果的对象
        // 执行callbacks里的函数，并保存data，并将当前proise状态改为resolved
        function resolve () {
            //  promise的状态只能改变一次
            if (self.status !== 'pending') {
                return
            }

            self.status = 'resolved'
            self.data = value

            // 如果有待执行的callback函数，立即异步执行回调函数onResolved
            if (self.callbacks.length) {
                self.callbacks.forEach(callbackObj => {
                    callbackObj.onResolved(value)
                })
            }
        }

        // Promise函数对象的reject方法，返回一个指定reason的失败状态的promise对象
        function reject () {
            //  promise的状态只能改变一次
            if (self.status !== 'pending') {
                return
            }

            self.status = 'rejected'
            self.data = value

            // 如果有待执行的callback函数，立即异步执行回调函数onRejected
            if (self.callbacks.length) {
                self.callbacks.forEach(callbackObj => {
                    callbackObj.onRejected(value)
                })
            }
        }
        
        try {
            // 立即同步执行executor
            executor(resolve, reject)
        } catch (e) {
            // 如果执行器抛出异常，promise对象变为rejected状态
            reject(e)
        }
        
    }

    // Promise原型对象的then, 指定一个成功/失败的回调函数，返回一个新的promise对象
    Promise.prototype.then = function (onResolved, onRejected) {
        // then函数的值透传，当参数不是函数时，这个then函数是无效的
        // 实际上，当then中传入的不是函数时，这个then返回的promise的data，会保存上一个的promise.data
        // 每一个无效的then所返回的promise的状态都为resolved
        onResolved = typeof onResolved === 'function' ? onResolved: value => value
        onRejected = typeof onRejected === 'function' ? onRejected: reason => { throw reason }
    
        var self = this

        function handle(callback) {
            try {
                const result = callback(self.data)
                if (result instanceof Promise) {
                    result.then(
                        value => { resolve(value) },
                        reason => { reject(reason) }
                    )
                } else {
                    resolve(result)
                }
            }
            catch (e) {
                reject(e)
            }
        }

        return new Promise((resolve, reject) => {
            if (self.status === 'pending') {
                // 收集传入的回调
                self.callbacks.push({
                    onResolved() {
                        handle(onResolved)
                    },
                    onRejected() {
                        handle(onRejected)
                    }
                })
            } else if (self.status === 'resolved') {
                // 异步执行，而且是微任务 所以使用setTimeout
                setTimeout(() => {
                    handle(onResolved)
                })
            } else {
                setTimeout(() => {
                    handle(onRejected)
                })
            }
        })
    }

    // Promise原型对象的catch, 指定一个失败的回调函数，返回一个新的promise对象
    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected)
    }

    
    // Promise.resolve可以传三种值 
    // Promise.resove(1) | Promise.resolve(Promise.resolve(1)) | Promise.resolve(Promise.reject(1))
    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(
                    value => { resolve(value) },
                    reason => { reject(reason) }
                )
            } else {
                resolve(value)
            }
        })
    }

    Promise.reject = function (value) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    // 返回一个Promise对象，只有当所有Promise都成功时返回的promise状态才成功
    Promise.all = function (promises) {
        const values = new Array(promises.length)
        const resolveCount = 0
        
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                // 解决Promise.all([p1, 2, 3, p2])
                // Promise.resolve(p) 将不是promise的数字包装成promise
                Promise.resolve(p).then(
                    value => {
                        // p状态为resolved, 将值保存起来
                        values[index] = value
                        resolveCount++
                        if (resolveCount === promises.length) {
                            resolve(values)
                        }
                    },
                    reason => {
                        // 只要有一个失败，return的promise状态就为reject
                        reject(reason)
                    }
                )
            })
        })
    }

    // 返回一个Promise对象，状态由第一个完成的promise决定
    Promise.race = function (value) {
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => {
                        // 只要有一个成功，返回的promise的状态就是resolved
                        resolve(value)
                    },
                    reason => {
                        // 只要有一个失败，返回的promise状态就为reject
                        reject(reason)
                    }
                )
            })
        })
    }
    
    // 向外暴露Promise
    window.Promise = Promise
})()