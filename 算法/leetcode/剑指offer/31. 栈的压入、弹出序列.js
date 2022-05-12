// 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。

//  

// 示例 1：

// 输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
// 输出：true
// 解释：我们可以按以下顺序执行：
// push(1), push(2), push(3), push(4), pop() -> 4,
// push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
// 示例 2：

// 输入：pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
// 输出：false
// 解释：1 不能在 2 之前弹出。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
/* 
  用一个新的数组将pushed依次入栈，同时popped第一个元素存在新数组中，将新数组中的这个元素是不是在栈尾
 */
 var validateStackSequences = function(pushed, popped) {
  if (pushed.length !== popped.length) return false
  let i = 0; let j = 0 
  const stack = []
  while( i < pushed.length && j < popped.length) {
    if ( pushed[i] !== popped[j] ) {
      stack.push(pushed[i])
    } else {
      j++
      while (stack.length > 0 && stack[stack.length - 1] == popped[j] && j < popped.length  ) {
        stack.pop()
        j++
      }
    }
    i++
  }
  return stack.length === 0
};

console.log(validateStackSequences([1,0], [0,1]))