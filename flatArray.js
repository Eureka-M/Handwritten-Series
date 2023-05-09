function flatArray1(array) {
    return array.flat(Infinity)
}

// 转成字符串，再去掉字符串里的 “[” 和 “]”，再把字符串转回数组
function flatArray2(array) {
    return JSON.parse( "[" + JSON.stringify(array).replace(/\[|\]/g, "") + "]")
}

function flatArray3(array) {
    let crr = array.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatArray3(cur) : cur);
    }, [])

    return crr
}