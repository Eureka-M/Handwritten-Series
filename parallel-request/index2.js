const arr = []
for (let i = 0; i < 100; i++) {
    arr.push(
        () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("done", i)
                    resolve()
                }, 100 * i)
            })
        }
        
    )
}

/**
 *
 * @param array 里面每个都是promise对象
 * @param limit 最大并发执行个数
 * @param onEnd 所有执行完成的回调
 */
async function asyncPool(array, limit, onEnd) {
    const ret = []
    const executing = []

    for (const item of array) {
        const itemPromise = item()
        ret.push(itemPromise)

        if (limit <= array.length) {
            const executePromise = itemPromise.then(() =>
                executing.splice(executing.indexOf(executePromise), 1)
            )
            executing.push(executePromise)

            if (executing.length >= limit) {
                await Promise.race(executing)
            }
        }
    }

    return Promise.all(ret).then(onEnd)
}

asyncPool(arr, 6, () => { console.log('全部结束！！！') })
