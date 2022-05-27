// 我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。

//  

// 示例:

// 输入: n = 10
// 输出: 12
// 解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/chou-shu-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number} n
 * @return {number}
 */

// 超时
 var nthUglyNumber = function(n) {
  const uglyArrays = [1,2,3,4,5]
  if (n <= 5 ) return  uglyArrays[n-1]
  let count = n - 5
  let ugly = 6
  while(count > 0) {
    if (ugly % 2 === 0 && uglyArrays.includes(ugly / 2)) {
      uglyArrays.push(ugly)
      count--
    } else if (ugly % 3 === 0 && uglyArrays.includes(ugly / 3)){
      uglyArrays.push(ugly)
      count--
    } else if (ugly % 5 === 0 && uglyArrays.includes(ugly / 5)){
      uglyArrays.push(ugly)
      count--
    }
    ugly++
    
  }
  console.log(uglyArrays)
  return uglyArrays[uglyArrays.length - 1]
};

console.log(nthUglyNumber(1690))

/* 
  三个指针不超时
 */


  const nthUglyNumberV2 = (n) => {
    if (n <= 1) return 1
    const uglyArrays = [1]
    let i = 0
    let j = 0
    let k = 0
    n -= 1
    while(n--) {
      const ans = Math.min(uglyArrays[i] * 2, uglyArrays[j] * 3, uglyArrays[k] * 5)
      if (ans === uglyArrays[i] * 2) i++
      if (ans === uglyArrays[j] * 3) j++
      if (ans === uglyArrays[k] * 5) k++
      uglyArrays.push(ans)
    }
    return uglyArrays[uglyArrays.length  - 1]
  }

  console.log(nthUglyNumberV2(10))