/**
 * 模拟一个微任务
 */

function aysncRun(fn) {
    if (typeof Promise !== undefined) {
        Promise.resolve().then(fn)
    } else if (typeof MutationObserver !== undefined) {
        const ob = new MutationObserver(fn)
        const textNode = document.createTextNode('0')
        ob.observe(textNode, {
            characterData: true
        })
        textNode = '1'
    } else {
        setTimeout(fn)
    }
}