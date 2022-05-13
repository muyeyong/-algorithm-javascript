// 请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

//  

// 例如:
// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层次遍历结果：

// [
//   [3],
//   [20,9],
//   [15,7]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

/* 
  怎么记录同一层的数据
 */
 var levelOrder = function(root) {
  if(!root) return []
  const ans = []
  const stack = [root]
  let step = 0
  while(stack.length > 0) {
    const ansTemp = []
    const nextStack = []
    while(stack.length > 0) {
      if (step % 2 === 0) {
        // 从左到右
       const curr = stack.shift()
       if (!curr) continue
       ansTemp.push(curr.val)
       if (curr.left) nextStack.push(curr.left)
       if (curr.right) nextStack.push(curr.right)
      } else {
        // 从右到左 
        const curr = stack.pop()
        if (!curr) continue
        ansTemp.push(curr.val)
        if (curr.right) nextStack.unshift(curr.right)
        if (curr.left) nextStack.unshift(curr.left)
      }
    }
    ans.push(ansTemp)
    stack.push(...nextStack)
    step++
  }
  return ans
};