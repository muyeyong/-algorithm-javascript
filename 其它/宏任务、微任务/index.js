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
