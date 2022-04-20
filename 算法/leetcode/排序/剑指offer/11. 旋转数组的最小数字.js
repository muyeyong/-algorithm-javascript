// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

// 给你一个可能存在 重复 元素值的数组 numbers ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为 1。  

// 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof

/**
 * @param {number[]} numbers
 * @return {number}
 */
 var minArray = function(numbers) {
   if (numbers.length === 1) return numbers[0]
   if(numbers.length === 2) return Math.min(numbers[0], numbers[1])
   let i = 1
    for (; i < numbers.length; i++) {
      if (numbers[i] < numbers[i-1]) break
    }
    return i === numbers.length ? numbers[0] : Math.min(numbers[0], numbers[i])
};

console.log(minArray([1,3,5]))

// TODO 用二分实现