const { reject } = require("lodash")

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
let a = function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('xhr1')
        // resolve('xhr1')
        reject('xh1')
      }, 2000)
    })
  }
  
  let b = function(arg) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('xhr2',arg )
        resolve('xhr2')
        // reject('xh2')
      }, 2000)
    })
  }
  let steps = [a, b] // 从右向左执行
  let composeFn = asyncCompose(steps)
  
  composeFn({a: 1}).then(res => { console.log(res) }).catch(err=>{
      console.log('error',err)
  })
  
  function doSoming(count){
    if(count<=2) throw new Error('哈哈哈哈')
    return '999'
  }

  function test(count){
   return  new Promise((resolve, reject)=>{
        if(count>3) reject(null)
        try {
            const res = doSoming(count)
            resolve(res)
        } catch (error) {
            if(count==2) reject(error)
            resolve(test(count+1))
        }
    })
  }

  test(0).then(res=>{
      console.log('res',res)
  }).catch(err=>{
      console.log('err',err)
  })
  