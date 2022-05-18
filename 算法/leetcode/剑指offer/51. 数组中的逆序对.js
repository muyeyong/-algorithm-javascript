// 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

//  

// 示例 1:

// 输入: [7,5,6,4]
// 输出: 5

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
 看前面有多少比它大
 */
 var reversePairs = function(nums) {
   if (nums.length <= 1) return 0
   const ans = Array.from({ length: nums.length}, () => 0)
  for (let i = 1; i< nums.length; i += 1) {
   if (nums[i] < nums[i -1 ]) {
   
    for (let j = i -1 ; j>=0; j -= 1) {
      if (nums[j] === nums[i] ) {
        ans[i] += ans[j]
        break
      } else if (nums[j] > nums[i]) {
        ans[i]++
      }
    }
     
   } else if(nums[i] > nums[i-1]){
     ans[i] = 0
     for (let j = i - 1; j>=0; j -= 1) {
      if (nums[i] < nums[j] || nums[i] === nums[j]) {
        nums[i] < nums[j] ? ans[i] = ans[j] + 1 : ans[i] = ans[j]
        break
      }
     }
   } else if (nums[i] === nums[i-1]) {
     ans[i] = ans[i-1]
   }
  }
  return ans.reduce((a, b) => a+b)
};

console.log(reversePairs([233,2000000001,234,2000000006,235,2000000003,236,2000000007,237,2000000002,2000000005,233,233,233,233,233,2000000004]))

/*  [
    233,2000000001,234,2000000006,235,2000000003,
    236,2000000007,237,2000000002,2000000005,233,233,233,
    233,233,2000000004
  ] */