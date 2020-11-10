/* 给出一个区间的集合，请合并所有重叠的区间。 */
var merge = function(intervals) {
    if(intervals.length<=1) return intervals
    intervals.sort((x,y)=>x[0]- y[0])
    let minL = intervals[0][0], maxR = intervals[0][1]
    let ans = []
    for(let i=1;i<intervals.length;i++){
        if(intervals[i][0]>=minL && intervals[i][0]<=maxR){
            minL = intervals[i][0]<minL? intervals[i][0] : minL
            maxR = intervals[i][1]>maxR? intervals[i][1] : maxR
        }else {
            ans.push([minL,maxR])
            minL = intervals[i][0]
            maxR = intervals[i][1]
        }
    }
    ans.push([minL,maxR])
    return ans
};

console.log(merge([[1,3],[2,6],[8,10],[15,18]]))