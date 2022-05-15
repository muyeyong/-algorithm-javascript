// 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。

//  

// 参考以下这颗二叉搜索树：

//      5
//     / \
//    2   6
//   / \
//  1   3
// 示例 1：

// 输入: [1,6,3,2,5]
// 输出: false
// 示例 2：

// 输入: [1,3,2,6,5]
// 输出: true

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} postorder
 * @return {boolean}
 */
/* 
 数组的最后一项是当前树的根节点，然后根据二叉搜索树的特点
  1：根据最后一项将数组分隔成两部
  2：继续测试分割
 */
 var verifyPostorder = function(postorder) {
   if (postorder.length <= 1) return true
  const root = postorder.pop()
  let index = -1
  for(let i = 0; i < postorder.length; i += 1){
    if (postorder[i] > root ) {
      index = i 
      break
    }
    if ( i=== postorder.length - 1 ) {
      index = i + 1
    }
  }
  if ( index === -1 )return false
  const left = postorder.slice(0,index)
  const right = postorder.slice(index)
  if (left.some(item => item > root) || right.some(item => item < root)) return false
  return verifyPostorder(left) && verifyPostorder(right)
};

console.log(verifyPostorder([1,2,5,10,6,9,4,3]))