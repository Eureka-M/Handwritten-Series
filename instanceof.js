function myInstanceof(left, right) {
    let left = Object.getPrototypeOf(left)
    let prototype = right.prototype
    
    while(true) {
        if (left === null) {
            return false
        }
        if (prototype === left) {
            return true
        }
        left = Object.getPrototypeOf(left)
    }
}