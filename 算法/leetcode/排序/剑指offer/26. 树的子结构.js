// 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

// B是A的子结构， 即 A中有出现和B相同的结构和节点值。

// 例如:
// 给定的树 A:

//      3
//     / \
//    4   5
//   / \
//  1   2
// 给定的树 B：

//    4 
//   /
//  1
// 返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */

/* 
  将整个树遍历一次，然后对比对比
 */



const treeA = {
  val: 1,
  left: {
    val: 3, 
    left: {
      val: 2, left: null, right: null
    },
    right: null
  },
  right: {
    val: 4,
    left: { val: 11, left: null, right: null},
    right: null
  }
}

const treeB = {
  val: 1, left: { val: 3, left: null, right: null }, right: null
}

const traverse = (tree) => {
  if (!tree) return []
  return [tree.val].concat(traverse(tree.left)).concat(traverse(tree.right))
}
 var isSubStructure = function(A, B) {
  if (!A || !B) return false
  let listA = traverse(A)
  let listB = traverse(B)
  if (listB.length > listA.length) return false
  while(true) {
    if (listB.length > listA.length) return false
    const index = listA.findIndex(item => item === listB[0])
    if (index !== -1) {
      let i = index; let j = 0
     while((listA[i] === listB[j] && i < listA.length && j < listB.length) || (
      listA[i + 1] === listB[j] && i + 1 < listA.length && j < listB.length
     )) {
       if (listA[i] === listB[j]) {
        i+=1
       }
       if (listA[i + 1] === listB[j]) {
        i+=1
       }
       j++
     }
     if ( j === listB.length) return true
    listA = listA.slice(index + 1)
    } else {
      return false
    }
  }
};


// console.log(isSubStructure(treeA, treeB))

/* 
  20220506 : 思路不太对，不应该将树全部遍历出来，还是需要在树结构上比较
  先在A中找到与B相等的节点，然后以这个节点为根节点比较
 */

  const compare = (A, B) => {
    if (!B) return true
    if (!A) return false
    return A.val === B.val && compare(A.left, B.left) && compare(A.right, B.right)
  }

const isSubStructureV2 = (A, B) => {
  if (!B || !A) return false
  return compare(A, B) || isSubStructureV2(A.left, B) || isSubStructureV2(A.right, B)
}

console.log(isSubStructureV2(treeA, treeB))