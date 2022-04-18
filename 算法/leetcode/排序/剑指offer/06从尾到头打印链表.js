// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

 

// 示例 1：

// 输入：head = [1,3,2]
// 输出：[2,3,1]

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
 var reversePrint = function(head) {
  let values = []
  while(head) {
    values.push(head.val)
    head = head.next
  }
  let i= 0; let j = values.length - 1
  while( i < j) {
    const temp = values[i]
    values[i] = values[j]
    values[j] = temp
    i++
    j--
  }
  return values
};

// 递归实现
var reversePrintV2 = function(head) {
  if (!head) return []
  if (head.next === null) return [head.val]
  return [...reversePrint(head.next)].concat(head.val)
}
