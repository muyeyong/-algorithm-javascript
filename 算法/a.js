var sex = "boy";
var echo = function (value) {
  console.log(value)
}

module.exports = {
  sex,
  echo
}

let a = () => {
  setTimeout(() => {
    console.log("任务队列函数1");
  }, 0);
  for (let i = 0; i < 5000; i++) {
    console.log("a的for循环");
  }
  console.log("a事件执行完");
};

let b = () => {
  setTimeout(() => {
    console.log("任务队列函数2");
  }, 0);
  for (let i = 0; i < 5000; i++) {
    console.log("b的for循环");
  }
  console.log("b事件执行完");
};
let c = () => {
  setTimeout(() => {
    console.log("任务队列函数3");
  }, 0);
  for (let i = 0; i < 5000; i++) {
    console.log("c的for循环");
  }
  console.log("c事件执行完");
};
a();
b();
c();
// 异步任务列表会等主线程所有任务执行完成之后，才执行、
