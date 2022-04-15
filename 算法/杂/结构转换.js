// ["a=1", "b=2", "c=", "d=xxx", "a=2"] 转换 {"a":[1,2],"b":2,"c":,"d":xxx}

function transform(arr) {
  if (arr.length <= 0) return {}
  arr.sort()
  const prefix = arr[0].split('=')[0]
  let index = 0
  for(;index < arr.length; index += 1){
    if (arr[index].split('=')[0] !== prefix) break
  }
  const ans = {}
  if ( index >= 2) { 
    ans[prefix] = arr.slice(0, index).map(item => item.split('=')[1])
  } else if ( index === 1) {
    ans[prefix] = arr[0].split('=')[1]
  }
  return {...ans, ...transform(arr.slice(index))}
}

const ans = transform(["a=1", "b=2", "c=", "d=xxx", "a=2", "a=2","a=2"])
console.log(ans)