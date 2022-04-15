// https://leetcode-cn.com/problems/single-number-ii/
// 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
/**
 * @param {number[]} nums
 * @return {number}
 */
 var singleNumber = function(nums) {
   let result = 0
  for (let i=0; i< 32; i+=1) {
    const binary = 1<<i
    let count = 0
    for (let j=0; j< nums.length; j+=1) {
      if (binary & nums[j]) {
        count ++
      }
    }
    if (count%3!=0) {
      result |= binary
    }
  }
  return result
};

const r = singleNumber([0,1,0,1,0,1,99])
console.log(r)