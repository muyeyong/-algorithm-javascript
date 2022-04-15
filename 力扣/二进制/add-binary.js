// https://leetcode-cn.com/problems/add-binary/
/* 
var addBinary = function(a, b) {
  const maxLen = Math.max(a.length, b.length)
  if (a.length < maxLen) a = addPrefixZero(a, maxLen - a.length) 
  if (b.length < maxLen) b = addPrefixZero(b, maxLen - b.length) 
  let sumStr = ''
  for (let i= 0; i < maxLen; i += 1) {
    sumStr+= (Number(a[i]) + Number(b[i])).toString()
  }
  let sumArr = sumStr.split("").reverse().map(str => Number(str))
  for (let i = 0; i< sumArr.length; i+=1) {
    if (sumArr[i] >= 2) {
      sumArr[i]%= 2
      sumArr[i+1] = i+1 >= sumArr.length ? 1 : sumArr[i+1] + 1
    }
  }
  return sumArr.reverse().join("")
};

var addPrefixZero = function (str,len) {
  let newStr = str
  while (len > 0) {
    newStr = '0' + newStr
    len --
  }
  return newStr
} */

var addBinary = function(a, b) {
  let ans = "";
  let ca = 0;
  for(let i = a.length - 1, j = b.length - 1;i >= 0 || j >= 0; i--, j--) {
      let sum = ca;
      sum += i >= 0 ? parseInt(a[i]) : 0;
      sum += j >= 0 ? parseInt(b[j]) : 0;
      ans += sum % 2;
      ca = Math.floor(sum / 2);
  }
  ans += ca == 1 ? ca : "";
  return ans.split('').reverse().join('');
};

console.log(addBinary("101", "1"))