var node = require('./node').node

class linkList {
  constructor() {
    this.head = new node('head');
    this.size = 0;
  }
  traverse() {
    let temp = this.head.next;
    while (temp) {
      console.log(temp.element);
      temp = temp.next;
    }
  }
  append(newNode) {
    if (Object.prototype.toString.call(newNode) !== '[object Object]') newNode = new node(newNode)
    let temp = this.head;
    while (temp.next) temp = temp.next;
    temp.next = newNode;
    this.size++;
  }
  //插入到指定元素之后
  insertAfter(newNode, beforeNodeValue) {
    let temp = this.head;
    while (temp && temp.element !== beforeNodeValue) temp = temp.next;
    if (!temp) return;
    newNode.next = temp.next;
    temp.next = newNode;
    this.size++;
  }
  //插入到指定元素之前
  insertBefort(newNode, afterNodeValue) {
    let temp = this.head;
    while (temp && temp.next.element !== afterNodeValue) temp = temp.next;
    if (!temp) return;
    newNode.next = temp.next;
    temp.next = newNode;
    this.size++;
  }
  //删除链表中的第n个节点
  delectByIndex(n) {
    if (n > this.size || this.size === 0) return;
    if (n === 1) {
      thia.head.next = null;
      return;
    }
    let node = this.head.next;
    while (--n) {
      node = node.next;
    }
    node.next = node.next.next;
    this.size--;
  }
  //反转单链表
  reverse() {
    if (this.size <= 1) return;
    let node = this.head.next.next, preNode = this.head.next;
    while (node) {
      let temp = node.next;
      node.next = preNode;
      preNode = node;
      node = temp;
    }
    this.head.next.next = null;
    this.head.next = preNode;
  }
  //得到链表尾结点
  getTail() {
    if (this.size == 0) return null;
    let temp = this.head.next;
    while (temp.next) temp = temp.next;
    return temp;
  }
  isLoopLink() {
    if (this.size === 0) return false;
    let slow = this.head.next, fast = this.head.next;
    while (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) return true;
    }
    return false;
  }
}

module.exports = {
  linkList
}