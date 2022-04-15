const arr = [1,2,2,3,4,4,5,7,8,11,12,12,13,13]
//找到第一个值等于给定值的元素
const findFirst = (arr,target)=>{
    let low = 0, height = arr.length-1
    while(low<=height){
        let mid = low + ((height-low)>>1)
        if(arr[mid]>= target) height = mid -1
        else low = mid +1
    }
    if(low<arr.length&&arr[low] === target) return low
    return -1
}
// console.log(findFirst(arr,12))
//找到最后一个值等于给定值的元素
const findLast = (arr,target)=>{
    let low = 0, height = arr.length-1
    while(low<=height){
        let mid = low + ((height-low)>>1)
        if(arr[mid]<= target) low = mid +1
        else height = mid -1
    }
    if(height<arr.length&&arr[height] === target) return height
    return -1
}
console.log(findLast(arr,13))
//找到第一个大于等于给定值的元素
const arr = [1,2,2,3,4,4,5,7,8,11,12,12,13,13]
const bsearch = (arr,target)=>{
    let low = 0 , height = arr.length
    while(low<=height){
        let mid = low + ((height-low)>>2)
        if(arr[mid]<=target) low = mid +1
        else height = mid -1 
    }
    if(height+1<arr.length&&arr[height+1]> target) return height+1
    return -1
}
console.log(bsearch(arr,2))
//找到最后一个小于等于给定值的元素
