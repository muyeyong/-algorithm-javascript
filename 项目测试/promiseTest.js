// 存储promise观察状态是否可以改变
const p1 = new Promise((resolve, reject)=> {
  setTimeout(() => {
    resolve('ok')
  }, 2000)
})
console.log(p1)
setTimeout(()=> {
  console.log(p1)
}, 4000)