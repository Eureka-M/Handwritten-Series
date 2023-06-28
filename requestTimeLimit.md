题目：
rpcRequest是前端封装的一个耗时请求方法，但该方法缺少去ing求时间的限制。请对该方法进行二次封装，使其具备调用方设置请求实限的能力。
例如：原来调用方式：
```
import { rpcRequest } from './request'
...
const res = await rpcRequest(param)
新的调用方式：const res = await rpcRequestTimeLimit(param, 5000); 
封装方式尽可能优雅
```

```
const rpcRequestTimeLimit = (data, delay) => {
    return Promise.race([
        rpcRequest(data),
        setTimeout((resolve, reject) => {
            reject(new Error('request timeout'))
        }, delay)
    ])
}
```