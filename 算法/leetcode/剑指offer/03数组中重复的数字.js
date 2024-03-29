// 找出数组中重复的数字。


// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

// 示例 1：

// 输入：
// [2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3 

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof


/**
 * @param {number[]} nums
 * @return {number}
 */
 var findRepeatNumber = function(nums) {
  nums.sort()
  for(let i=1; i< nums.length; i+=1) {
      if (nums[i-1] === nums[i]) return nums[i]
  }
};

// 其实没必要进行全部的排序，进行一半的排序就可以了

var findRepeatNumberV2 = function(nums) {
  nums.splice(Math.ceil(nums.length / 2))
  console.log('nums', nums)
  nums.sort()
  for(let i=1; i< nums.length; i+=1) {
    if (nums[i-1] === nums[i]) return nums[i]
  }
}

console.log(findRepeatNumberV2([2, 3, 1, 0, 2, 5, 3]))