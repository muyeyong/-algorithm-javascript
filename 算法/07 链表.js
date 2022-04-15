var linkList = require('../linkList').linkList
let link = new linkList();
for (let i = 0; i < 5; i++) link.append(i)
//链表反转
// link.traverse()
// link.reverse()
// console.log('reverse linkList')
// link.traverse()

//链表中环的判断
let loopLink = new linkList();
for (let i = 0; i < 10; i++) loopLink.append(i);
// loopLink.getTail().next = loopLink.head.next;

// console.log(loopLink.isLoopLink())

//有序链表合并
let link1 = new linkList();
let link2 = new linkList();
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    link1.append(i);
  } else {
    link2.append(i);
  }
}

//合并有序列表
function mergeLink(link1, link2) {
  if (link1.size === 0 && link2.size !== 0) {
    return link2;
  }
  if (link2.size === 0 && link1.size !== 0) {
    return link1;
  }
  if (link1.size === 0 && link2.size === 0) return null;

  let newLink = new linkList('head');
  let link1Node = link1.head.next, link2Node = link2.head.next;
  while (link1Node && link2Node) {
    if (link1Node.element > link2Node.element) {
      newLink.append(link2Node.element);
      link2Node = link2Node.next;
    } else {
      newLink.append(link1Node.element);
      link1Node = link1Node.next;
    }
  }
  while (link1Node) {
    newLink.append(link1Node.element);
    link1Node = link1Node.next;
  }
  while (link2Node) {
    newLink.append(link2Node.element);
    link2Node = link2Node.next;
  }
  return newLink;
}

let mergedLink = mergeLink(link1, link2);
mergedLink.traverse()

//删除链表中倒数第n个节点

//求链表中间结点