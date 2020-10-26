let arr = [10,2,5,9,0,3,678,334,234,1,78]
//桶排序
const bucketSort = (arr,bucketSize=5)=>{
    if(arr.length<=1) return
    const bucketArr = createBuckets(arr,bucketSize)
    return sortBuckets(bucketArr)
}
const createBuckets = (arr,bucketSize)=>{
    const {length} = arr 
    if(length<=1) return
    let minValue = arr[0], maxValue = arr[0],bucketArr = []
    for(let i=1;i<length;i++){
        if(arr[i]> maxValue) maxValue = arr[i]
        if(arr[i]< minValue) minValue = arr[i]
    }
    const bucketCount = Math.ceil((maxValue-minValue)/bucketSize)
    for(let i=0;i<=bucketCount;i++) bucketArr[i] = []
    for(let i=0;i<length;i++){
        bucketArr[Math.ceil((arr[i]-minValue)/bucketSize)].push(arr[i])
    }
    return bucketArr
}
const sortBuckets = (bucketArr=[])=>{
    const {length} = bucketArr
    let sortArr = []
    for(let i=0;i<length;i++){
        if(bucketArr&&bucketArr.length>1){
            insertSort(bucketArr[i])
            sortArr.push(...bucketArr[i])
        }
    }
    return sortArr
}
const insertSort = (arr)=>{
    const {length} = arr
    if(length<=1) return
    for(let i = 1;i<length;i++){
        let j = i-1
        const pointValue = arr[j]
        while(j>=0){
            if(arr[i]< pointValue){
                j--
            }else break
        }
        swap(arr,j+1,i)
    }
}
const swap = (arr,i,j)=>{
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

console.log('桶排序',bucketSort(arr,4))
//计数排序 是桶排序的一个特列，每个桶里面只有一个元素
const countingSort = (arr)=>{
    const {length} = arr
    if(length<=1) return
    let c = [],r=[], maxValue = arr[0]  
    for(let i=1;i<length;i++){
        if(arr[i]>maxValue) maxValue = arr[i]
        if(!c[arr[i]]) c[arr[i]] = 0
        c[arr[i]]++
    }
   
    for(let i=1;i<=maxValue;i++) {
      if(!c[i]) c[i] = 0
    }
    for(let i=1;i<=maxValue;i++){
        c[i] = c[i] + c[i-1]
    }
   
    for(let i = length-1;i>=0;i--){
        const value = arr[i]
        const count = c[value]
        c[value]--
        if(!r[count]) r[count] = 0
        r[count] = value
    }
    return r
}

console.log(countingSort([2,5,3,0,2,3,0,3]))
//基数排序
