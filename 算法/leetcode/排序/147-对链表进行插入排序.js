function node (val){
    this.val = val
    this.next = null
}
const findPre = (s,e,node)=>{
    if(s.val>node.val) return null
    let i = s 
    while(i!==null&&i.next&&i!=e){
        if(i.next.val > node.val) break
        i = i.next
    }
    return i===e? null: i
}
var insertionSortList = function(head) {
    if(!head || head.next === null) return head;
    let newHead = new node(null)
    newHead.next = head
    let i = newHead.next
    while(i!==null&&i.next){
        let j = i.next
       if(j&&(j.val<i.val)){
        let preNode = findPre(newHead.next,i,j)
        if(preNode){
            i.next = j.next
            j.next = preNode.next
            preNode.next = j
        }else{
            i.next = j.next
            j.next = newHead.next
            newHead.next = j
        }
       }else{
        i = i.next
       }
    }
    return newHead.next
};

const createNode = (arr)=>{
    let head = new node(null), p 
    p = head
    for(let i =0;i<arr.length;i++){
        let newNode = new node(arr[i])
        p.next = newNode
        p = p.next
    }
    return head.next
}

console.log(insertionSortList(createNode([4,2,1,3])))