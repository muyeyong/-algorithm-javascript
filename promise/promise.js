const asyncCompose = function(args){
    const init = args.pop()
    return function(arg){
        return args.reduce(function(sequence,fuc){
            return sequence.then(function (res) {
                return fuc.call(null, res)
            })
        }, Promise.resolve(init.apply(null,arg)))
    }
}
let a = async() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('xhr1')
        // resolve('xhr1')
        reject('xh1')
      }, 2000)
    })
  }
  
  let b = async() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('xhr2')
        resolve('xhr2')
        // reject('xh2')
      }, 2000)
    })
  }
  let steps = [a, b] // 从右向左执行
  let composeFn = asyncCompose(steps)
  
  composeFn().then(res => { console.log(res) }).catch(err=>{
      console.log('error',err)
  })
  