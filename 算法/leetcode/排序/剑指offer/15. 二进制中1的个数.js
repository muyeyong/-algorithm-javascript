// 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为 汉明重量).）。
// https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/

/**
 * @param {number} n - a positive integer
 * @return {number}
 */
 var hammingWeight = function(n) {
   let ans = 0
  while(n > 0) {
    ans += (n % 2)
    n = Math.floor(n / 2)
  }
  return ans
};

console.log(hammingWeight(11))