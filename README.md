# Handwritten-Series

some handwritten examples

### promise

-   定义整体结构
    -   promise 函数模块：IIFE，只向外暴露 promise
    -   添加 promise 原型对象上的方法: Promise.prototype.then, Promise.prototype.catch
    -   添加 Promise 函数对象上的方法: Promise.resolve, Promise.reject, Promise.all, Promise.race
-   实现 Promise 构造函数
    -   每个 promise 都有一个状态可能为 pending 或 resolved，rejected,初始状态都为 pending
    -   每个 promise 有自己的 data
-   实现 then 方法
    -   promise.then()是一个微任务
-   实现 catch 方法
-   实现 Promise.resolve
-   实现 Promise.reject
    -   返回一个指定 reason 的失败状态的 promise 对象
-   实现 Promise.all
    -   返回一个 promise 对象，只有当所有 promise 都成功时返回的 promise 状态才成功
-   实现 Promise.race
    -   返回一个 promise 对象，状态由第一个完成的 promise 决定
