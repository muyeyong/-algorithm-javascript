// 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/jian-sheng-zi-lcof

/**
 * @param {number} 
 * @return {number}
 */
const find = function(n) {
  if (n===1) return 1
  if (n===2) return 1
  if (n===3) return 2
  if (n===4) return 4
  if (n===5) return 6
  if (n===6) return 9
  if (n===7) return 12 
  if (n===8) return 18 
  if (n===9) return 27
  if (n===10) return 36
  const mid = n /2
  return Math.max(find(Math.floor(mid)) * find(Math.ceil(mid)), find(Math.floor(mid) -1) * find(Math.ceil(mid) + 1))
}
 var cuttingRope = function(n) {
  return find(n)
};

console.log(cuttingRope(14))