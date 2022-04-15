/* 
    实现vue双向数据绑定，通过数据劫持以及发布订阅模式实现
    Object.defineProperty() 定义对象的属性及值，不仅仅可以定义直接的属性，还可以定义子孙的属性

    就算重新赋值也不会影响 get set
 */

 // 数据劫持
 function Mvvm(options={}){
    let data = this._data = options.data
    observe(data)
    for(let key in data ){
        Object.defineProperty(this, key, {
            configurable: true,
            get(){
                return this._data[key]
            },
            set(newVal){
                this._data[key] = newVal
            }
        })
    }
    compile(options.el, this)
 }


function Watch(vm,exp,fn){
    this.fn = fn
    this.vm = vm
    this.exp = exp
    Dep.target = this;
   let arr = exp.split('.');
   let val = vm;
   arr.forEach(key => {    // 取值
      val = val[key];     // 获取到this.a.b，默认就会调用get方法
   });
   Dep.target = null;
}

Watch.prototype.update = function(){
    let arr = this.exp.split('.');
    let val = this.vm;
    arr.forEach(key => {    
               val = val[key];   // 通过get获取到新的值
      });
    this.fn(val); 
}

function Dep(){
    this.subs = []
}
Dep.prototype.addSub = function(fn){
    this.subs.push(fn)
}
Dep.prototype.notify = function(){
    this.subs.forEach(fn=> {
        fn.update()
    })
}


   function observe(data){
    if(!data || typeof data !== 'object') return
    let dep = new Dep()
    for(let key in data) {
        let val = data[key]
        if(typeof data[key] === 'object') {
            observe(data[key])
        }
        Object.defineProperty(data,key,{
            configurable: true,
            get(){
                Dep.target && dep.addSub(Dep.target)
                return val // 不能使用 data[key],会造成死循环
            },
            set(newVal){
                if(val === newVal)  return
                val = newVal
                dep.notify()
            }
        })
    }
 } 

 function compile(el, vm) {
    vm.$el = document.querySelector(el)
    const fragment = document.createDocumentFragment()
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child)
    }
    function replace(fg){
        const reg = /\{\{(.*?)\}\}/g
        Array.from(fg.childNodes).forEach(node=>{
            const text = node.textContent
            if(node.nodeType === 1 && reg.test(text)) {
               const arr =  RegExp.$1.split('.')
               let val = vm
               while(key = arr.shift()) {
                   val = val[key]
               }
               node.textContent = text.replace(reg, val).trim()
               const watch = new Watch(vm,RegExp.$1,newVal=>{
                node.textContent = text.replace(reg, newVal).trim()
               }) 

            }
            if(node.childNodes && node.childNodes.length >0) {
                replace(node)
            }
        })
    }
    replace(fragment)
    vm.$el.appendChild(fragment)
 }

 /* 当数据改变视图应该更新，发布订阅
    compile里面绑定事件
    set里面去触发事件
*/


/* 
 发布者
 消息中心
 订阅者
 将消息中心传递到订阅者中去
 */



