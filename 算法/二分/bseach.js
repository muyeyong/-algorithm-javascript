export const bsearch = (arr,left,right,target)=>{
    if(left>=right) return
    let mid =  left + ((right-left)>>1)
    if(arr[mid] === target) return target
    if(target> arr[mid]) return bsearch(arr,mid+1,right,target)
    else return bsearch(arr,left,mid-1,target)
}