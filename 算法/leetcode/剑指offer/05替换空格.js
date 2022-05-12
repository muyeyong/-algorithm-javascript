// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

//  

// 示例 1：

// 输入：s = "We are happy."
// 输出："We%20are%20happy."


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof

/**
 * @param {string} s
 * @return {string}
 */
 var replaceSpace = function(s) {
   let ans = ''
  for (let sub of s) {
    ans += (sub === ' ' ? '%20' : sub)
  }
  return ans
};

replaceSpace("We are happy.")

// let iterable = "We are happy.";

// for (let value of iterable) {
//   console.log(value);
// }