// 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

//  

// 示例 1:

// 输入: [10,2]
// 输出: "102"
// 示例 2:

// 输入: [3,30,34,5,9]
// 输出: "3033459"


// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {string}
 */

/*
  思路：
    自定义排序算法，数字越小越靠前
    如果相同比较后面的数字，后面没有的话，默认为最大
 */
 var minNumber = function(nums) {
  const strategy = (a, b) => {
    const aStr = a.toString()
    const bStr = b.toString()
    let i = 0
    let j = 0
    for (; i < aStr.length && j < bStr.length; i++, j++) {
      if (aStr.charAt(i) < bStr.charAt(j)) return -1
      if (aStr.charAt(i) > bStr.charAt(j)) return 1
    }
    if (i >= aStr.length && j < bStr.length){
      for (let k = 0; k < bStr.length; k++) {
        if (bStr.charAt(k) !== bStr.charAt(j)) {
          // a 部分
          if (k < j) {
            return bStr.charAt(k) < bStr.charAt(j) ? -1 : 1
          } else if(k > j) { // b部分
            return bStr.charAt(k) < bStr.charAt(j) ? 1 : -1
          }
        }
      }
      return 0
    }
    if (j >= bStr.length && i < aStr.length){
      for (let k = 0; k < aStr.length; k++) {
        if (aStr.charAt(k) !== aStr.charAt(i)) {
           // b 部分
           if (k < i) {
            return aStr.charAt(k) < aStr.charAt(j) ? 1 : -1
          } else if(k > i) { // a部分
            return aStr.charAt(k) < aStr.charAt(j) ? -1 : 1
          }
        }
      }
      return 0
    }
    return 0
  }
  return nums.sort(strategy).join('')
};

console.log(minNumber([2, 2281]))

/* 2022-06-12
  写的太复杂了，如果仔细分析下的话，完全没必要这么做, 比较 a + b > b + a即可
 */
  var minNumber = function(nums) {
    
    return nums.sort((a, b) => {
        return `${a}${b}` - `${b}${a}`
    }).join('')
  };