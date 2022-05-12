// 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。

//  

// 示例 1：

// 输入：x = 2.00000, n = 10
// 输出：1024.00000
// 示例 2：

// 输入：x = 2.10000, n = 3
// 输出：9.26100
// 示例 3：

// 输入：x = 2.00000, n = -2
// 输出：0.25000
// 解释：2-2 = 1/22 = 1/4 = 0.25


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const getN10 = function (n) {
  if (n === 0) return 1
  let ans = 1
  while(n > 0) {
    ans *= 10
    n--
  }
  return ans
}
 var myPow = function(x, n) {
   if (n === 0) return 1
   if (n === 1) return x
  const nIsNegate = n < 0 ? true : false
  const returnNegate = x < 0 && Math.abs(n) % 2 !== 0
  let loopTime = Math.abs(n)
  let [integer, decimal] = Math.abs(x).toString().split('.')
  let ans = []
  let multiply = []
  let decimalIndex
  if (decimal) {
    ans = [].concat(...decimal.split('').reverse(), ...integer.split('').reverse())
    multiply = [].concat(...decimal.split('').reverse(), ...integer.split('').reverse())
    decimalIndex = decimal.length * (loopTime > 0 ? loopTime : 1)
  } else {
    ans = [].concat(...integer.split('').reverse())
    multiply = [].concat(...integer.split('').reverse())
  }
  
  while(loopTime > 1) {
    let sum = 0
    for (let i = 0; i < ans.length; i += 1) {
      for (let j = 0; j < multiply.length; j += 1) {
        if (multiply[j] === '.' || ans[i]==='.') sum /= 10
        else {
          sum += multiply[j] * ans[i] * (getN10(i)) * (getN10(j))
        }
      }
    }
    loopTime--
    ans = sum.toString().split('').reverse()
  }
  decimalIndex && ans.splice(decimalIndex, 0, '.')
  const result = nIsNegate ? 1 / Number(ans.reverse().join('')) : ans.reverse().join('')
  return returnNegate ? -result : result
};

console.log('waaaa',myPow(8.84372,-5))

