console.log(Object.prototype.toString.call(true))

function getType(object){
    return Object.prototype.toString.call(object).replace(/^\[object (\S+)\]$/,'$1')
}

console.log(getType('ffff'))
