let arr = [1, 2, 3, 4]


// console.log(arr.join('-'))


let str = '1,2,3,4'
// console.log(str.split(','))


// console.log(arr.reverse())

arr = [23, 56, 1, 78, 0]
// console.log(arr.sort((a, b) => a - b))

function quickSort(arr) {
  // 交换元素
  function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  function partition(arr, left, right) {
    var pivot = arr[left];
    var storeIndex = left;

    for (var i = left + 1; i <= right; i++) {
      if (arr[i] < pivot) {
        swap(arr, ++storeIndex, i);
      }
    }

    swap(arr, left, storeIndex);

    return storeIndex;
  }

  function sort(arr, left, right) {
    if (left < right) {
      var storeIndex = partition(arr, left, right);
      sort(arr, left, storeIndex - 1);
      sort(arr, storeIndex + 1, right);
    }
  }

  sort(arr, 0, arr.length - 1);

  return arr;
}

// console.log(quickSort([6, 7, 3, 4, 1, 5, 9, 2, 8]))


// console.log([2, 1, 3, 111, 333, 22].sort((x, y) => 1))

// console.log([1, 2, 3].concat([4, 5], [6, 7]))

// console.log([1, 2, 3].concat([4, [5, 6]]))

// console.log([1, 2, 3, 4, 5].slice(0, 3))

// console.log([1, 2, 3, 4, 5].slice(2, -1))

// arr = [1, 2, 3, 4, 5]
// console.log(arr.push(6, 7))
// console.log(arr)

// console.log(arr.pop())
// console.log(arr)

// let arr2 = new Array(3)
// console.log(arr2.length)

// arr2.push(1)
// arr2.push(2)
// arr2.push(3)
// arr2.push(4)

// console.log(arr2)

// arr = [1, 2, 3, 4, 5]

// console.log(arr.unshift(1, 2, 3))
// console.log(arr)

// console.log(arr.shift())
// console.log(arr)

// let arr3 = [1, 2, 3, 4]
// let arr4 = [1, 2, 3, 4]

// arr3.push(5, 6)
// arr4.unshift(5, 6)

// console.log(arr3)
// console.log(arr4)

// console.log([1, 2, 3, 4].toString())

// console.log([1, 2, 3, [4]].toString())

// 

// var array = [1, 2, 3, 4, 5];
// array.forEach(function (item, index) {
//   if (item === 2) {
//     array.concat(array.splice(index, array.length - index));
//   }
//   console.log(item); //只输出1,2
// });

// arr = [1, 2, 3, 4, 5, 6]
// console.log(arr.splice(1, 3))
// console.log(arr)

// arr = [1, 2, 3, 4, 5, 6]
// console.log(arr.splice(0, 0, 'abc', 1))
// console.log(arr)

// arr = [1, 2, 3, 4, 5]
// arr.forEach((value, index, arr) => {
//   console.log(value, index, arr)
// })

// arr = [1, 2, 3, 4, 5]

// console.log(arr.map(x => x * x))
// console.log(arr)

// arr = [1, 2, 3, 4, 5, 6]
// console.log(arr.filter(x => x % 2 === 0))
// console.log(arr)

// arr = [1, 2, 3, 4, 5, 6]
// console.log(arr.some(x => x < 5))
// console.log(arr.every(x => x < 5))

// arr = [1, 2, 3, 4, 5]

// let sum1 = arr.reduce((x, y) => x + y, 0)

// let sum2 = arr.reduce((x, y) => x + y)

// console.log('sum1', sum1, 'sum2', sum2)

// arr = [1, 2, 5, 4, 5]
// console.log(arr.indexOf(5))
// console.log(arr.indexOf(6))
// console.log(arr.lastIndexOf(5))

// arr = [1, 2, 3, 4, 5]
// console.log(...arr)

// function ArrayOf() {
//   return [].slice.call(arguments);
// }

// console.log(ArrayOf(1, 2, 3))

// console.log(...[1, 2, 3])

// f = (x, y, ...rest) => {
//   console.log(rest)
//   return x + y
// }
// console.log(f(...[1, 2, 3, 4]))

// let arr2 = [1, 2, 34]
// let [...arr3] = arr2
// let arr4 = [...arr2]
// console.log(arr3, arr4)

// let arrayLike = {
//   '0': 1,
//   '1': 2,
//   '2': 3,
//   length: 3
// };

// console.log(Array.from(arrayLike, x => x * x))

// function f(a, b, c) {
//   console.log(arguments.length)
// }

// f(1, 2, 3, 4, 5)

// console.log('Array()', Array(), 'Array.of()', Array.of())

// console.log('Array(1)', Array(1), 'Array.of(1)', Array.of(1))

// console.log('Array(1,2)', Array(1, 2), 'Array.of(1,2)', Array.of(1, 2))

// let result = [1, 2, 3, 4].find((value, index, arr) => {
//   return value > 3
// })
// console.log(result)

// console.log(Array(5).fill(6))

// console.log(Array.of(1, 2, 3, 4).fill('1'))

// console.log([NaN].find(x => x != x))

// [1, 2, [3, 4], [5]].flat()