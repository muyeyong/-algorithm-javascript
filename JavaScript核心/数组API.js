// 数组构造器： 字面量[]、 new Array()、Array.from()、Array.of()
// 改变自身的方法： concat(合并数组)、 split(切割数组,splice)、push(新增)
            // 正解（9个）： pop(尾部操作) push(尾部操作) reverse shift(头部操作) unshift(头部操作) sort splice  copyWithin(es6) fill(es6)
// 不改变自身：slice(返回元素)、查找（find、indexOf）、reduce、map、
            //正解(9个)：concat join(将数组转换成字符串) slice toString toLocaleString indexOf lastIndexOf includes toSource
// 遍历方法：for(in、of)、forEach、Object.keys
           // 正解(12个)：forEach every some filter map reduce reduceRight es6: entries find findIndex keys values

    var arr = [ {name: 'brick1'}, {name: 'brick2'}, {name: 'brick3'} ]
   const result =  arr.reduce((pre,next,index)=>{
        let link = ','
        console.log('pre',pre,next)
        if(index === arr.length-1)  link = '&'
        return `${pre.name?pre.name:pre} ${link} ${next.name}`
    })
    console.log(result)