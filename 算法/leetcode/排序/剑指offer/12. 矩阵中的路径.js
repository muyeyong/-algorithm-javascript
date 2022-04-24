// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

/* 
  思路：
    四个方向找 （x,y)  记录是否被使用 剩余匹配的字符串
 */
const find = function(y,x, record,board, word) {
  if (word === '') return true
  if (x<0 || y<0 || x>=board[0].length || y>=board.length || record[y][x] === true) return false
  const firstLetter = word.charAt(0)
  let newWord = word
  if (record[y][x] === false && board[y][x] === firstLetter) {
    console.log(y, x)
    record[y][x] = true
    newWord = newWord.slice(1)
   const ans = find(y-1,x, record,board, newWord) || find(y+1,x, record,board, newWord) || find(y, x+1, record,board, newWord) || find(y,x-1, record,board, newWord)
   record[y][x] = false
   return ans
  } else return false
  
}
 var exist = function(board, word) {
  const WIDTH = board[0].length; const HEIGHT = board.length
  const record = Array.from({length: HEIGHT}, () => 
     Array.from({ length: WIDTH}, () => false)
   )
  for(let i = 0; i < HEIGHT; i += 1) {
    for(let j = 0; j < WIDTH; j += 1) {
     const result =  find(i,j,record, board, word)
     if (result === true) return true
    }
  }
  return false
};

const b1 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
const w1 = 'ABCCED'
const b2 = [["a","b"],["c","d"]]
const w2 = "abcd"
console.log(exist([["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], "ABCESEEEFS"))
