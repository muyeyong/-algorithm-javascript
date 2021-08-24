/* 
    实现vue双向数据绑定，通过数据劫持以及发布订阅模式实现
    Object.defineProperty() 定义对象的属性及值
 */

 // 数据劫持
 function Mvvm(options={}){
    let data = this._data = options.data
    observe(data)
 }

   function observe(data){
    if(!data || typeof data !== 'object') return
    for(let key in data) {
        let val = data[key]
        if(typeof data[key] === 'object') {
            observe(data[key])
        }
        Object.defineProperty(data,key,{
            configurable: true,
            get(){
                return val // 不能使用 data[key],会造成死循环
            },
            set(newVal){
                console.log(`set ${key}`, newVal)
                val = newVal
            }
        })
    }
 } 


//  let mvvm = new Mvvm({
//      data: {
//          a: {
//              b:1
//          },
//          c:3
//      }
//  })

// console.log(mvvm._data)
// mvvm._data.a = {}
// mvvm._data.a = 1
// console.log(mvvm._data)


