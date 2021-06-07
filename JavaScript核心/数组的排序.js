// 排序方法： 冒泡排序（O(n2)）、插入排序（O(n!)）、堆排序（O(n)）、归并排序（O(n*log n)）、选择排序
// JS排序分类
    // 比较排序：通过比较来决定元素的相对次序，时间复杂度不能突破O(n*logn)，也称为非线性时间的比较排序
        // 交换排序==>冒泡排序、快速排序
        // 插入排序;
        // 选择排序==>普通选择排序、堆排序
        // 归并排序;
    // 非比较排序：不通过比较决定元素的相对次序，可以突破基于比较排序的时间下线，以线性的时间远行，也称为线性时间非比较排序
        // 计数排序
        // 桶排序
        // 基数排序
// 代码实现：
    // 冒泡排序： 稳定的排序 O(n2)
       const bubbleSort = (arr=[])=>{
           for(let i =0 ;i<arr.length;i++){
               for(let j=i+1;j<arr.length;j++){
                if(arr[j]< arr[i]){
                    const temp = arr[j]
                    arr[j] = arr[i]
                    arr[i] = temp
                }
               }
           }
           return arr
       }
       const arr = [-1,0,-1,3,5,9,1000]
       bubbleSort(arr)
       console.log(arr );
    // 快速排序 不稳定的排序
       const quickSort = (arr=[])=>{
        //    console.log(arr)
           if(arr.length<=1) return arr
            const mid = Math.floor(arr.length /2)
            let left = []
            let right = []
            let pivot = arr.splice(mid,1)[0]
            for(let i=0;i<arr.length;i+=1){
                if(arr[i]<= pivot ) left.push(arr[i])
                else right.push(arr[i])
            }
            return quickSort(left).concat(pivot,quickSort(right))
       }
       let arr = [2,4,1,3,6,5]
       console.log(quickSort(arr))
    // 插入排序 稳定排序
       const insertSort = (arr=[])=>{
            for(let i=0;i<arr.length-1;i+=1){
                const target = arr[i+1]
                for(let j=0;j<=i;j+=1){
                    if(arr[j]>target){
                        let k = i
                        while(k>=j){
                            arr[k+1] = arr[k]
                            k-=1
                        }
                        arr[j] = target
                        break
                    }
                }
            }
       }
       let arr = [2,4,1,3,6,5,-1,0]
       insertSort(arr)
       console.log(arr)
    // 选择排序 稳定排序
       const selectSort = (arr=[])=>{
           for(let i=0;i<arr.length;i+=1){
               let minIndex = i
               for(let j=i+1;j<arr.length;j+=1){
                    if(arr[j]<arr[minIndex]){
                        minIndex = j
                    }
               }
               if(i !== minIndex){
                   const temp = arr[i]
                   arr[i] = arr[minIndex]
                   arr[minIndex] = temp
               }
           }
       }
       let arr = [2,4,1,3,6,5,-1,0]
       selectSort(arr)
       console.log(arr)

    // 归并排序
      const mergeArr = (arrA=[],arrB=[])=>{
        let result = [], i=0,j=0
            while(i<arrA.length && j<arrB.length){
                if(arrA[i]<arrB[j]){
                    result.push(arrA[i])
                    i+=1
                }else{
                    result.push(arrB[j])
                    j+=1
                }
            }
            while(i<arrA.length){
                result.push(arrA[i])
                i+=1
            }
            while(j<arrB.length){
                result.push(arrB[j])
                j+=1
            }
            return result
       }
      const  mergeSort = (arr=[])=>{
          if(arr.length<=1) return arr
          let mid = Math.floor(arr.length>>1)
          let rightArr = arr.slice(0,mid)
          let leftArr = arr.slice(mid)
        return  mergeArr(mergeSort(rightArr),mergeSort(leftArr))
      }
      let arr = [2,4,1,3,6,5,-1,0]
      console.log( mergeSort(arr))
    // 堆排序
    function buildHeap(items, heapSize) {
        while(heapSize < items.length - 1) {
            heapSize ++
            heapify(items, heapSize)
        }
    }
    
    function heapify(items, i) {
        // 自下而上式堆化
        while (Math.floor(i/2) >= 0 && items[i] < items[Math.floor(i/2)]) {  
            swap(items, i, Math.floor(i/2)); // 交换 
            i = Math.floor(i/2); 
        }
    }  
    
    function swap(items, i, j) {
        let temp = items[i]
        items[i] = items[j]
        items[j] = temp
    }
    
    // 测试
    var items = [5, 2, 3, 4, 1]
    // 初始有效序列长度为 1
    buildHeap(items, 0)
    console.log(items)
