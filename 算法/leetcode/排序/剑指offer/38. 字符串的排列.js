// 输入一个字符串，打印出该字符串中字符的所有排列。

//  

// 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

//  

// 示例:

// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @return {string[]}
 */

const traverse = (s, visited, s1, list) => {
  if (s1.length === s.length) {
    list.push(s1)
    return
  }
 const ans = []
  for (let i = 0; i < s.length; i += 1) {
    if (visited[i] === false) {
      visited[i] = true
      traverse(s, visited, s1 + s.charAt(i), list)
      visited[i] = false
    }
  }
}
 var permutation = function(s) {
   const list = []
  traverse(s, Array.from({ length: s.length }, () => false ), '', list)
  return Array.from(new Set(list))
};

permutation('abc')