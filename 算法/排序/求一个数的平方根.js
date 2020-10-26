const squareRoot = (num)=>{
  return  binarySearch(0,num,num)
}

const binarySearch = (left,right,targetValue)=>{
    if(left>=right) return 
    var mid = (right+left)/2 // let const 
    if(Math.abs(targetValue-mid*mid)<= 10e-6 ) return mid
    if(mid*mid > targetValue) return binarySearch(left,mid,targetValue)
    else return binarySearch(mid,right,targetValue)
}

console.log(squareRoot(6))



function sqrtBisection(n) {
    if (isNaN(n)) return NaN;
    if (n === 0 || n === 1) return n;
    var low = 0,
        high = n,
        pivot = (low + high) / 2,
        lastPivot = pivot;
    // do while 保证执行一次
    do {
        if (Math.pow(pivot, 2) > n) {
            high = pivot;
        } else if (Math.pow(pivot, 2) < n) {
            low = pivot;
        } else {
            return pivot;
        }
        lastPivot = pivot;
        pivot = (low + high) / 2;
    }
    // 2018-04-25 22:08 更新
    // 使用Number.EPSILON表示能够接受的最小误差范围
    while (Math.abs(pivot - lastPivot) >= Number.EPSILON)

    return pivot;
}
console.log(sqrtBisection(6))