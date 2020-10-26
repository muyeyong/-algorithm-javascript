const swap = (arr,l,r)=>{
    const temp = arr[l]
    arr[l] = arr[r]
    arr[r] = temp
}

const partition = (arr,start,end)=>{
    const pivot =  arr[end]
    let i = start
    for(let j= start;j<end;j++){
        if(arr[j]<pivot){
            swap(arr,i,j)
            i++
        }
    }
    swap(arr,i,end)
    return i
}

const quickSort = (arr,start,end,target)=>{
    // if(start>=end) return 
    const pivotIndex = partition(arr,start,end)
    if(pivotIndex +1 === target) return arr[pivotIndex]
    if(target>pivotIndex+1)return quickSort(arr,pivotIndex+1>end? end:pivotIndex+1 ,end,target)
    else  return quickSort(arr,start,pivotIndex-1<start? start:pivotIndex-1,target)
}

const find = (arr,target)=>{
   return  quickSort(arr,0,arr.length-1,target)
}

let arr = [4,5,1,3,890,5,-3,0]

console.log('发现目标',find(arr,5))