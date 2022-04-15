var singleNumber = function(nums) {
  return nums.reduce((pre, next) => pre^next)
};
console.log(singleNumber([2,2,1]))