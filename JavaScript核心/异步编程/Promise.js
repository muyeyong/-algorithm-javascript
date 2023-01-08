// Promise内部的状态： pending、resolve(fulfilled)、reject(rejected)
// Promise怎么解决回调地狱：.then()
    // 回调地狱的问：多层嵌套、处理返回成功or失败的两种情况
    // Promise解决：回调函数延迟绑定、返回值穿透 ：解决多层嵌套、错误向下传递：解决两种状态

//1.获取轮播数据列表

function getBannerList(){

    return new Promise((resolve,reject)=>{
  
        setTimeout(function(){
  
          resolve('轮播数据')
  
        },300) 
  
    })
  
  }
  
  //2.获取店铺列表
  
  function getStoreList(){
  
    return new Promise((resolve,reject)=>{
  
      setTimeout(function(){
  
        resolve('店铺数据')
  
      },500)
  
    })
  
  }
  
  //3.获取分类列表
  
  function getCategoryList(){
  
    return new Promise((resolve,reject)=>{
  
      setTimeout(function(){
  
        resolve('分类数据')
  
      },700)
  
    })
  
  }
  
  function initLoad(){ 
  
    Promise.all([getBannerList(),getStoreList(),getCategoryList()])
  
    .then(res=>{
  
      console.log(res) 
  
    }).catch(err=>{
  
      console.log(err)
  
    })
  
  } 
  
  initLoad()
  // Promise的静态方法
    // all(iterable): 成功：按顺返回所有Promise的结果 ；失败：进入失败处理函数
    // alSettled(iterable): 可以拿到每一个Promise的结果
    // any(iterable): 实验中的特性，只要有一个Promise实例变成了fulfilled，最后any返回的实例就是fulfilled，如果全部实例返回rejected，any返回的实例就是rejected
    const resolved = Promise.resolve(2);
    const resolved1 = Promise.resolve(3);
    const resolved2 = Promise.resolve(4);
    const rejected = Promise.reject(-1);
    const anyPromise = Promise.any([resolved, resolved1,resolved2,rejected]);
    anyPromise.then(function (results) {
      console.log(results);
    });
    // race(iterable): 那个Promise实例率先变化，race返回就是率先变化实例的值
        //请求某个图片资源

function requestImg(){

    var p = new Promise(function(resolve, reject){
  
      var img = new Image();
  
      img.onload = function(){ resolve(img); }
  
      img.src = 'http://www.baidu.com/img/flexible/logo/pc/result.png';
  
    });
  
    return p;
  
  }
  
  //延时函数，用于给请求计时
  
  function timeout(){
  
    var p = new Promise(function(resolve, reject){
  
      setTimeout(function(){ reject('图片请求超时'); }, 5000);
  
    });
  
    return p;
  
  }
  
  Promise.race([requestImg(), timeout()])
  
  .then(function(results){
  
    console.log(results);
  
  })
  
  .catch(function(reason){
  
    console.log(reason);
  
  });
  
  