/* 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-colors
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
var sortColors = function(nums) {
  return insertSort(nums)
};

const insertSort = (arr)=>{
    let i,j
    const{length} = arr
    for( i =1;i<length;i++){
        let value = arr[i]
        for(j=i-1;j>=0;j--){
            if(value< arr[j]) arr[j+1] = arr[j]
            else break
        }
        arr[j+1] = value
    }
    return arr
}

console.log(sortColors([2,0,2,1,1,0]))