/* N  辆车沿着一条车道驶向位于 target 英里之外的共同目的地。
每辆车 i 以恒定的速度 speed[i] （英里/小时），从初始位置 position[i] （英里） 沿车道驶向目的地。
一辆车永远不会超过前面的另一辆车，但它可以追上去，并与前车以相同的速度紧接着行驶。
此时，我们会忽略这两辆车之间的距离，也就是说，它们被假定处于相同的位置。
车队 是一些由行驶在相同位置、具有相同速度的车组成的非空集合。注意，一辆车也可以是一个车队。
即便一辆车在目的地才赶上了一个车队，它们仍然会被视作是同一个车队。
会有多少车队到达目的地?
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/car-fleet
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
var carFleet = function(target, position, speed) {
    if(position.length<=0) return 0
    let cars = [],count=1
    for(let i=0;i<position.length;i++){
        cars.push({p:position[i],t:(target-position[i])/speed[i]})
    }
    cars.sort((x,y)=> x.p - y.p)
    let flag = cars[cars.length-1].t
    for(let i=cars.length-1;i>=0;i--){
        if(cars[i].t>flag){
            flag = cars[i].t
            count++
        }
    }
    return count
};
