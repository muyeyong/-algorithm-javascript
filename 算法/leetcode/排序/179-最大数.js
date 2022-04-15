/* 给定一组非负整数 nums，重新排列它们每位数字的顺序使之组成一个最大的整数。
注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。 */

const reversalString = (str)=>{
    const {length} = str
    let len = length
    len--
    let rStr= ''
    while(len>=0){
        rStr+= str.charAt(len)
        len--
    }
    return rStr
}
var largestNumber = function(nums) {
    if(nums.length<=1) return nums[0].toString()
    let numsStr = nums.map(item=> reversalString(item.toString()))
    numsStr.sort((x,y)=>{
        if(x===y) return 0
        else {
            let i =x.length-1,j=y.length-1
            let count = Math.max(i,j)+1
            while(true){
                if(x.charAt(i)< y.charAt(j)) return -1
                else if(x.charAt(i)>y.charAt(j)) return 1
                i = i-1<0? x.length-1:i-1
                j = j-1<0? y.length-1:j-1
                count--
                if(count<0) return 0
            }
        }
    })
    let ans = ''
    for(let i= numsStr.length-1;i>=0;i--){
       let sub = numsStr[i]
       for(let j=sub.length-1;j>=0;j--){
           ans+=sub.charAt(j)
       }
    }
    if(ans.charAt(0)==='0') return '0'
    return ans
};

console.log(largestNumber([8308,8308,830]))

console.log(['3','03'].sort())
console.log('03'>'3')