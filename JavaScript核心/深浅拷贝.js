// 浅拷贝
    // Object.assign()
    let target = {}
    let source = {name:'花大姐',detail:{age:{age1:1}}}
    Object.assign(target,source)
    console.log('target init',target)
    source.detail.age.age1 = 18
    console.log('target change',target)

    // 解构赋值
    let target = {}
    let source = {name:'马大华',detail:{age:60}}
    target = {...source}
    console.log('target init',target)
    source.detail.age = 18
    console.log('target change',target)

    // Array.concat()
    let source1 = [1,2,3,4]
    let source2 = [7,8,a={b:1}]
    let target  = source1.concat(source2)
    console.log('target init',target)
    source2[2].b = 'i'
    console.log('target change',target)

    // Array.slice(start,end) 返回新的数组，包含start ,不包含end
    let source = [1,2,3,{a:2}]
    let target = source.slice(1)
    console.log('target init',target)
    source[3].a = 'i'
    console.log('target change',target)

    // 自定义实现 对于基础类型 和 对象做处理
    const shallowClone = (obj)=>{
        if(typeof obj === 'object' && obj !== null){
            const cloneObj = Object.prototype.toString.call(obj) === '[object Array]'? []:{}
            for(let prop in obj){
                if(obj.hasOwnProperty(prop)){
                    cloneObj[prop] = obj[prop]
                }
            }
            return cloneObj
        }else {
            return obj
        }
    }
    let source = {a:{b:1}}
    console.log(shallowClone(source))
// 深拷贝
    // JSON.stringify & JSON.parse
    let source = [1,2,3,{a:1,b:2}]
    const str = JSON.stringify(source)
    let target = JSON.parse(str)
    console.log('target init',target)
    source[3].a = 'i'
    console.log('change',source,target)

    // 自定义实现
    const deepClone = (obj)=>{
        if(typeof obj === 'object' && obj !== null){
            const cloneObj = Object.prototype.toString.call(obj) === '[object Array]'? []:{}
            for(let prop in obj){
                cloneObj[prop] = obj[prop]
                if(typeof obj[prop] === 'object') deepClone(obj[prop])
            }
            return cloneObj
        }else {
            return obj
        }
    }
    const source = [1,2,3,{a:1,b:2},{[Symbol('1')]: 1,},]
    Object.defineProperty(source, 'innumerable', {
        enumerable: false, value: '不可枚举属性' }
      );
    let source1 = {date: new Date(),func: function(){console.log('我是一个函数')}, reg:/^\d{3}\-\d{3,8}$/}
        source1 = Object.create(source1,Object.getOwnPropertyDescriptor(source1))
        source1.loop = source1
    const target = deepClone(source1)
    // target.func()
    // console.log(target.reg.test('010-12345'))
    console.log('target',target)
    
    // source[2].a = 'i'
    // console.log('target after',target)

    // 优化 解决无法复制不可枚举类型 Symbol类型 循环依赖
        const deepClonePro = (obj,hash= new WeakMap())=>{
            if(typeof obj === 'object' && obj !== null){
                if(hash.has(obj)) return hash.get(obj)
                const cloneObj = Object.create(Object.getPrototypeOf(obj),Object.getOwnPropertyDescriptor(obj))
                hash.set(obj,cloneObj)
                Reflect.ownKeys(obj).forEach(prop=>{ 
                    if(typeof prop === 'object' && prop!== null) cloneObj[prop] = deepClonePro(obj[prop],hash)
                    else cloneObj[prop] = obj[prop]
                })
                return cloneObj
            }else{
                return obj
            }
        }
        let source = {date: new Date(),func: function(){console.log('我是一个函数')}, reg:/^\d{3}\-\d{3,8}$/ ,[Symbol('1')]: 1,}
        Object.defineProperty(source, 'innumerable', {
            enumerable: false, value: '不可枚举属性' }
        );
        source = Object.create(source, Object.getOwnPropertyDescriptors(source))
        source.loop = source 
        console.log(deepClonePro(source))


