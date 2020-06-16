// call apply bind 练习

// name = 'aaa'

A = {
  name: '花大姐',
  saySomething: function (name) {
    console.log(this.name)
  }
}

var name = "windowsName";
function a() {
  var name = "Cherry";

  console.log(this.name);          // windowsName

  console.log("inner:" + this);    // inner: Window
}
a();
console.log("outer:" + this)


// call 
// 改变 this 的指向，返回执行函数的结果
// 1: 判断上下文是否合法
// 2：绑定传入上下文
// 3：传递参数
// 4：返回执行结果


Function.prototype.myCall = function (context, ...args) {
  console.log('1 ', context)
  if (context === null || context === undefined) context = window;
  else context = Object(context);
  let sym = Symbol();
  context[sym] = this;
  console.log('2 ', this)
  let result = context[sym](...args);
  delete context[sym];
  return result;
}

function saySomething(name) {
  console.log(this.str, name)
}

A = {
  str: '上帝说我帅的很'
}

saySomething.myCall(A, '花大姐')


//apply

Function.prototype.myapply = function (context, arg) {
  if (context === null || context === undefined) context = window;
  else context = Object(context);
  let sym = Symbol();
  context[sym] = this;
  let result;
  function isLikeArrayOrArray(o) {
    if (Object.prototype.toString.call(o) === '[object Array]') return true;
    if (o && typeof o === 'object'
      && isFinite(o.lenght) && o.lenght >= 0
      && o.lenght === Math.floor(o.lenght)
      && o.lenght < Math.pow(2, 32)) return true;
    else return false;
  }
  if (arg) {
    if (isLikeArrayOrArray(arg)) {
      result = context[sym](...arg);
    } else {
      throw Error('参数类型错误');
    }
  } else {
    result = context[sym]();
  };
  delete context[sym];
  return result;
}


function printArray() {
  this.arr.forEach(item => console.log(item))
  if (arguments) {
    console.log(arguments)
  }
}

B = {
  arr: [1, 2, 3, 4, 5, 6, 7]
}

printArray.myapply(B, [])


//bind   柯里化

Function.prototype.mybind = function (context, ...args1) {
  if (context === null || context === undefined) context = window;
  else context = Object(context);
  return (...args2) => this.call(context, ...args1, ...args2);
}

C = {
  name: '马大哈'
}

function sayMyName() {
  console.log('我是多余的参数...', arguments)
  console.log('My name is ' + this.name);
}

let hi = sayMyName.mybind(C, '1234,走起')

hi('456,出发')