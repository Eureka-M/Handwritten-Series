// 使用一个计数器来跟踪当前活动的并发请求数，并设置一个最大并发数限制。当每次完成一个请求，计数器减一，然后触发新的请求，直到达到最大并发数。

const arr = []
for (let i = 0; i < 100; i++) {
    arr.push(
        () => {
            new Promise((resolve) => {
                setTimeout(() => {
                    console.log("done", i)
                    resolve()
                }, 100 * i)
            })
        }
    )
}

const parallelRun = () => {
    const runningTask = []
    const enterQueue = (totalTask, max) => {
        while (runningTask.length < max && totalTask.length) {
            runningTask.push(totalTask.shift())
        }
    }
    
    const run = (totalTask, max) => {
        enterQueue(totalTask, max)
        while (runningTask.length) {
            runningTask
                .shift()()
                .finally(() => {
                    run(totalTask, max)
                })
        }
    }
    return run
}

parallelRun()(arr, 6)
