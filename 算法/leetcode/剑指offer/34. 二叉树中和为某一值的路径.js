// 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。

// 叶子节点 是指没有子节点的节点。

//  

// 示例 1：



// 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// 输出：[[5,4,11,2],[5,8,4,5]]

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */

const traverse = (root, target, ans, list) => {
  if (!root) return
  if (target - root.val  === 0 && root.left === null && root.right === null) {
    ans.push(list.concat(root.val))
    return
  }
  list.push(root.val)
  traverse(root.left, target - root.val, ans, list)
  traverse(root.right, target - root.val, ans, list)
  list.pop()
}

 var pathSum = function(root, target) {
  const ans = []
  traverse(root, target, ans, [])
  return ans
};

console.log(pathSum({ val: -2, left: null, right: { val: -3, right: null, left: null}}, -5))

