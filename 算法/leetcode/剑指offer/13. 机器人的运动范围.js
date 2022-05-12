// 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？



// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const getDigitSum = function(x) {
  let sum = 0
  while(x) {
    sum += (x % 10)
    x = Math.floor(x / 10)
  }
  return sum
}
const move = function(i, j,m, n, k,visit) {
  if (
    i < 0 || j < 0 || i >= m || 
    j >= n ||  visit[i][j] === true || 
    (getDigitSum(i) + getDigitSum(j) > k)
    ) return 0
  let sum = 1
  visit[i][j] = true
  sum += (move(i-1,j, m,n,k, visit) + move(i+1, j, m, n, k, visit) + 
  move(i, j-1, m, n, k, visit)) + move(i, j+1, m, n, k, visit)
  return sum
}
var movingCount = function(m, n, k) {
  const visit = Array.from({length: m}, () => 
    Array.from({length: n}, () => false)
  )
  if (m * n <= k) return m*n
  return move(0, 0,m,n,k, visit)
};

console.log(movingCount(2,3,17))