const asyncCompose = function(args){
  const init = args.shift()
  return function(arg){
      return args.reduce(function(sequence,fuc){
          return sequence.then(function (res) {
              return fuc.call(null, res)
          })
      }, Promise.resolve(init.call(null,arg)))
  }
}
const arr = [1,2,3,4]

let a = (args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(args + 'StepOne')
    }, 1000)
  })
}

let b = (args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(args + 'StepTow')
    }, 1500)
  })
}

let c = (args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(args + 'StepThree')
    }, 2000)
  })
}

const steps = [a, b, c]


const composeFun = asyncCompose(steps)

for(let i=0 ;i< arr.length ;i += 1) {
  composeFun(arr[i]).then(res => {
    console.log(res)
  })
}

