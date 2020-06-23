setTimeout(() => {
  new Promise(resolve => {
    resolve()
    console.log(4)
  }).then(() => {
    console.log(7)
  })
})

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(() => {
  console.log(3)
})

setTimeout(() => {
  Promise.resolve(6).then(() => console.log(6))
  new Promise(resolve => {
    resolve()
    console.log(8)
  }).then(() => {
    console.log(9)
  })
})

Promise.resolve(5).then(() => console.log(5))

console.log(2)


setTimeout(_ => console.log(4))

async function main() {
  console.log(1)
  console.log(await m())
  console.log(3)
}
async function m() {
  console.log(5)
  return 7;
}

main()

console.log(2)


new Promise((resolve,reject)=>{
  console.log("promise1",1) 
  resolve()
})
  .then(() => {
  console.log("then11",2)
  new Promise((resolve,reject)=>{
      console.log("promise2",3)
      resolve();
  }).then(()=>{
      console.log("then21",4)
      new Promise((resolve,reject)=>{
          console.log("promise3",5)
          resolve();
      }).then(()=>{
          console.log("then31",7)
      }).then(()=>{
              console.log("then32",9)
      })
  }).then(()=>{
      console.log("then22",8)
  })
  })
  .then(() => {
  console.log("then12",6)
})  