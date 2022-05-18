// 数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。

// 请写一个函数，求任意第n位对应的数字。

//  

// 示例 1：

// 输入：n = 3
// 输出：3
// 示例 2：

// 输入：n = 11
// 输出：0

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} n
 * @return {number}
 */
/* 
 先确定在那个区间

 */
 var findNthDigit = function(n) {
  let regain = 1
  let k = n
  while(k) {
    if (regain === 1) {
      if ( k - 10 <= 0) break
      else k -= 10
    } else {
      if ( k - regain * 9 * Math.pow(10, regain - 1) <= 0) break
      else k -= regain * 9 * Math.pow(10, regain - 1)
    }
    regain++
  }
  const start = regain === 1 ? 0 : Math.pow(10, regain - 1)
  const p = Math.floor(k / regain) 
  const c = k % regain
  return (start + p).toString().charAt(c)
};

console.log(findNthDigit(3))