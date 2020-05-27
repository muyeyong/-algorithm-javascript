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