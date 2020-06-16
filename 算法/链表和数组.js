class node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

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
    if (Object.prototype.toString.call(newNode) === '[object String]') newNode = new node(newNode)
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
}

class lruCash {
  constructor(limit) {
    this.limit = limit || 10;
    this.list = new linkList();
  }
}

class palindrome {

  strTurnLink(str) {
    let link = new linkList();
    for (let i = 0; i < str.length; i++) {
      link.append(str.charAt(i));
    }
    return link;
  }
  //单链表判断是不是回文串
  isPalindrome(str) {
    let link = this.strTurnLink(str);
    if (link.size === 0 || link.size === 1) return true
    let slow = link.head.next, fast = link.head.next;
    if (link.size % 2 === 0) {
      while (fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      //slow是前半部分的末尾
      fast = fast.next;
      let temp = fast;
      while (temp.next !== slow) {
        let node = slow;
        while (node.next !== temp) {
          node = node.next;
        }
        temp.next = node;
        temp = node;
      }
      slow.next = temp.next = null;
      let linkHead = link.head.next, linkTail = fast;
      while (linkHead.next && linkTail.next) {
        if (linkHead.element !== linkTail.element) return false;
        linkHead = linkHead.next, linkTail = linkTail.next;
      }
      return true;
    } else {
      while (fast.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      let temp = fast;
      while (temp !== slow) {
        let node = slow;
        while (node.next !== temp) {
          node = node.next;
        }
        temp.next = node;
        temp = node;
      }
      slow.next = null;
    }
    let linkHead = link.head.next, linkTail = fast;
    while (linkHead.next && linkTail.next) {
      if (linkHead.element !== linkTail.element) return false;
      linkHead = linkHead.next, linkTail = linkTail.next;
    }
    return true;
  }
}

let palindromeEntity = new palindrome();
console.log(palindromeEntity.isPalindrome('aagrgrgtrgreaa'));

