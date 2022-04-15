//传入嵌套数组，输入一维数组




function flat(arr) {
  let result = [];
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    arr.forEach(item => {
      debugger
      if (Object.prototype.toString.call(item) === '[object Array]') {
        debugger
        result = result.concat(flat(item))
      } else {
        result.push(item);
      }
    })
  }
  return result;
}

console.log(flat([1, 2, [2, 3, [1], [2]], 4]))

console.log('a')