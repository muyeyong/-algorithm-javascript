// 原型链继承
    // function 需要使用this
    // 缺点:共享原型链上的属性，改变可一个，其他的都变了; 子类调用父类的方法会访问父类的属性，就算这个属性子类也有
    // 构造函数的属性和方法无法被实例化对象共享
   function parent1 () {
       this.name='parent1';
       this.friends=['a','b','c']
        this.getName=()=>{
            return this.name
        }
    }
    parent1.prototype.age = 18
    function son1(){
        this.name = 'son1';
        // this.getName=()=>{
        //     return this.name
        // }
    }
    son1.prototype =  new parent1()
    const son11 = new son1()
    console.log(son11.age)
    const son12 = new son1()
    son12.friends.push('d')
    console.log(son11.friends,son12.friends,son11)


// 构造器继承
    // 子类不共享继承属性，但是不能使用父属性原型链上的方法和属性
    function parent2(){
        this.name = 'parent2';
        this.friends = ['a','b','c','d']
        this.getName= ()=>{
            return this.name
        }
    }
    parent2.prototype.age =45
    function son2(){
        parent2.call(this)
        this.name = 'son2'
    }
    const son21 = new son2()
    const son22 = new son2()
    son22.friends.push('e')
    console.log(son21,son22,son22.age)

    // 构造器实验  new 一个对象会继承构造函数的原型
      function parentT(){
          this.name = 'test'
      }
      parentT.prototype = ()=>{
          console.log('aaa')
      }
      console.log(new parentT())
        
// 组合继承 可以解决共享属性以及访问父级原型链的属性及方法，但是需要调两次父级
      function parent3(){
        this.name = 'parent3'
        this.friends = ['a','b','c']
      }
      parent3.prototype.age = 18
    //  console.log(parent3.prototype)
      function son3(){
        parent3.call(this)
        this.name = 'son3'
      }
      son3.prototype = new parent3()
      let son31 = new son3()
      let son32 = new son3()
      son31.friends.push('d')
      console.log(son31,son32)
// Object.create() 
      function parent4(){  // 不能访问构造函数本身的属性，需要配合改变this的指向 call
          this.name = 'parent4'
          this.getName = ()=>{
              return this.name
          }
      }
    //   let parent4 = {a:{b:1}}  
    parent4.prototype.age = 18
      let son4  =  Object.create(parent4.prototype) // object的话是： Object.create(obj) function的话：Object.create(fun.prototype)
      console.log(son4.age)
// 寄生组合继承
      function clone(parent,son){
        son.prototype = Object.create(parent.prototype)
      }
      function parent5(){
          this.name = 'parent5';
          this.friends = ['a','b','c']
      }
      parent5.prototype.age = 19
      function son5(){
          parent5.call(this)
          this.name = 'son5'
      }
      clone(parent5,son5)
      let son51 = new son5()
      son51.friends.push('d')
      let son52 = new son5()
      console.log(son51,son52.age)

// es6 extends
      class parent6{
          name = 'parent6';
          friends=['a','b','c']
      }
      class son6 extends parent6{
          constructor(){
              super()
          }
      }
      let son61= new son6()
      let son62 = new son6()
      son61.friends.push('d')
      console.log(son61,son62)


