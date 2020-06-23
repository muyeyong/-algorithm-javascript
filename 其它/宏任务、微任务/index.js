window.onload = function () {
  const $inner = document.getElementById('inner')
  const $outer = document.getElementById('outer')

  function handler() {
    console.log('click') // 直接输出

    Promise.resolve().then(_ => console.log('promise')) // 注册微任务

    setTimeout(_ => console.log('timeout')) // 注册宏任务

    requestAnimationFrame(_ => console.log('animationFrame')) // 注册宏任务

    $outer.setAttribute('data-random', Math.random()) // DOM属性修改，触发微任务
  }

  new MutationObserver(_ => {
    console.log('observer')
  }).observe($outer, {
    attributes: true
  })

  $inner.addEventListener('click', handler)
  $outer.addEventListener('click', handler)
}

console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')



let i = 20;
while (i--) { 
  setTimeout(function timeout () {
    console.log('timeout');
  },0);
  setImmediate(function immediate () {
    console.log('immediate');
  });
}

setTimeout(function timeout () {
  console.log('timeout');
},0);
setImmediate(function immediate () {
  console.log('immediate');
});


const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})


const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});


class Lib extends require('events').EventEmitter {
  constructor () {
    super()

    this.emit('init')
  }
}

const lib = new Lib()

lib.on('init', _ => {
  // 这里将永远不会执行
  console.log('init!')
})

class Lib extends require('events').EventEmitter {
  constructor () {
    super()

    process.nextTick(_ => {
      this.emit('init')
    })

    // 同理使用其他的微任务
    // 比如Promise.resolve().then(_ => this.emit('init'))
    // 也可以实现相同的效果
  }
}
const lib = new Lib()

lib.on('init', _ => {
  // 这里将永远不会执行
  console.log('init!')
})


let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) { process.nextTick(callback) ; }

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall hasn't completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined
});

bar = 1;



let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;

setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
 }, 0)
 process.nextTick(() => {
  console.log('nextTick')
  process.nextTick(() => {
    console.log('nextTick')
    process.nextTick(() => {
      console.log('nextTick')
      process.nextTick(() => {
        console.log('nextTick')
      })
    })
  })
 })