// 改变数组自身的 9个 api：push pop shift unshift splice sort reverse  es6: fill copyWithin
// 排序算法：比较排序=>冒泡 插入 快速 归并 选择 堆排序 ; 非比较排序=>计数排序 。。。
// 插入排序：保持一个有序的数组，进行插入
// 快速排序：选一个基准点，左边全部小于基准点，右边全部大于基准点

// sort排序
    // arr.sort([compareFunction]),不指定排序函数的话，元素按照转换为字符串的各个字符的 Unicode 位点进行排序
    // 指定排序函数 comF(a,b)=>  <0 a排在b前面，>0 b排在a前面，== 位置不变
    
//  当 n<=10 时，采用插入排序；

// 当 n>10 时，采用三路快速排序；

// 10<n <=1000，采用中位数作为哨兵元素；

// n>1000，每隔 200~215 个元素挑出一个元素，放到一个新数组中，然后对它排序，找到中间位置的数，以此作为中位数


