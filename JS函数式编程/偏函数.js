const partial = (fn, ...presetArgs)=>{
    return (...laterArgs)=>{
      return  fn(...presetArgs, ...laterArgs)
    }
}

// const add = (x,y)=>{
//     return x + y
// }
// const res = [1,2,3,4].map(partial(add, 3))
// console.log(res)

//////
function reverseArgs(fn) {
    return function argsReversed(...args){
        return fn( ...args.reverse() );
    };
}

function partialRight( fn, ...presetArgs ) {
    return reverseArgs(
        partial( reverseArgs( fn ), ...presetArgs.reverse() )
    );
}

// 
const a = (x,y,z)=>{
    console.log('x',x)
    console.log('y',y)
    console.log('z',z)
}
const t1 = partialRight(a,'我是第一个参数')
t1('我是第二个参数','我是第三个参数')






