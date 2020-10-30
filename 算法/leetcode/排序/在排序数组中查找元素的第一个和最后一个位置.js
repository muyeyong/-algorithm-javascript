/* 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
你的算法时间复杂度必须是 O(log n) 级别。
如果数组中不存在目标值，返回 [-1, -1]。
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
var searchRange = function(nums, target) {
    let firstIndex = findFirst(nums,0,nums.length-1,target)
    let lastIndex = findLast(nums,0,nums.length-1,target)
    return [firstIndex,lastIndex]
};

//找到第一个等于target的下标
const findFirst = (arr,low,height,target)=>{
    while(low<=height){
        let mid = low + ((height-low)>>1)
        if(arr[mid]>target){
            height = mid -1
        }else if(arr[mid]<target){
            low = mid +1
        }else{
            if((mid===0) || (arr[mid-1]!== target)) return mid
            else height = mid - 1
        }
    }
    return -1
}

//找到最后一个等于target的小标
const findLast = (arr,low,height,target)=>{
    while(low<=height){
        let mid = low + ((height-low)>>1)
        if(arr[mid]>target){
            height = mid - 1
        }else if(arr[mid]<target){
            low = mid + 1
        }else{
            if((mid=== arr.length-1) || (arr[mid+1]!== target)) return mid
            else low = mid + 1
        }
    }
    return -1
}
console.log(searchRange([5,7,7,8,8,10],8))