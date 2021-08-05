// const _ = require('lodash')

// var person = [{name: 'kevin'}, {name: 'daisy'}]

// var prop = curry(function (key, obj) {
//     return obj[key]
// })

// var name = person.map(prop('name'))
// console.log(name)
var curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
: (arg) => judge(...args, arg)

const add = (a,b)=>{
    return a+b
}

const addCurry = curry(add)

console.log(addCurry(1)(2))
