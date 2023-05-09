function getUrlParams (url) {
    let reg = /([^?&=]+)=([^?&=]+)/g
    let obj = { }
    url.replace(reg, function(){
        obj[arguments[1]] = arguments[2]
    })

    return obj
}

function getUrlParams2 () {
    const search = window.location.search
    search.replace(/([^&=?]+)=([^&]+)/g, (m, $1, $2)=>{obj[$1] = decodeURIComponent($2)})

    return obj
}