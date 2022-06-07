// 请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

//     1
//    / \
//   2   2
//    \   \
//    3    3

//  

// 示例 1：

// 输入：root = [1,2,2,3,4,4,3]
// 输出：true

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof
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
 * @return {boolean}
 */

const judgeSymmetric = (tree1, tree2) => {
  if (!tree1 && tree2 || !tree2 && tree1) return false
  if (!tree1 && !tree2) return true
  if (tree1.val !== tree2.val) return false
  return judgeSymmetric(tree1.right, tree2.left) && judgeSymmetric(tree1.left, tree2.right)
}
 var isSymmetric = function(root) {
  if (!root) return true
  if (root.left === null && root.right === null) return true
  if (!root.left && root.right || root.left && !root.right) return false
  return judgeSymmetric(root.left, root.right)
};

