// 输入某二叉树的前序遍历和中序遍历的结果，请构建该二叉树并返回其根节点。

// 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

// 不要想着一步完成，先生成一棵树，在层序遍历


 var buildTree = function(preorder, inorder) {
  if (inorder.length <= 0 || preorder.length <= 0) return null
  const index = inorder.findIndex(ino => ino === preorder[0]) 
  const left = inorder.slice(0, index)
  const leftPreorder = preorder.filter(preo => left.includes(preo))
  const right = inorder.slice(index + 1)
  const rightPreorder = preorder.filter(preo => right.includes(preo))
  const root = new TreeNode(preorder[0])
  root.left = buildTree(leftPreorder, left)
  root.right = buildTree(rightPreorder, right)
  return root
};
buildTree([3,9,20,15,7], [9,3,15,20,7])