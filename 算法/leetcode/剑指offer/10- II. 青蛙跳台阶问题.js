// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

// 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof

/**
 * @param {number} n
 * @return {number}
 */
 var numWays = function(n) {
   if ( n === 0 ) return 1
  if(n <= 2) return n
  let num1 = 1; let num2 = 2
  for (let i = 2; i < n; i += 1) {
    [num1, num2] = [num2, (num1 + num2) % 1000000007]
  }
  return num2
};

console.log(numWays(7))