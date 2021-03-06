
let arr = [8, 34, 1, 9, 354, 2, 3, 6]

//冒泡排序

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

}
// bubbleSort(arr)
// console.log(arr)

//插入排序

let arr1 = [3, 4, 1, 8]
function insertSort(arr) {
  if (arr.length <= 1) return;
  for (let i = 1; i < arr.length; i++) {
    let flagIndex = i - 1;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[i]) {
        flagIndex = j;
        break;
      }
    }
    if (arr[flagIndex] <= arr[i]) continue;
    let temp = arr[i];
    for (let k = i - 1; k >= flagIndex; k--) {
      arr[k + 1] = arr[k];
    }
    arr[flagIndex] = temp;
  }
}

function insertSort1(arr) {
  if (arr.length <= 1) return;
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let j = i - 1;
    for (; j >= 0; j--) {
      if (arr[j] > temp) arr[j + 1] = arr[j];
      else break;
    }
    arr[j + 1] = temp;
  }
}

// insertSort(arr1)
// console.log(arr1)

// insertSort1(arr1)
// console.log(arr1)

//选择排序

function selectSort(arr) {
  if (arr.length <= 0) return;
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
}

// selectSort(arr)
// console.log(arr)

// 归并排序
// 利用哨兵简化merge过程

const mergeArr = (left, right) => {
  let temp = []
  let leftIndex = 0
  let rightIndex = 0
  // 判断2个数组中元素大小，依次插入数组
  while (left.length > leftIndex && right.length > rightIndex) {
    if (left[leftIndex] <= right[rightIndex]) {
      temp.push(left[leftIndex])
      leftIndex++
    } else {
      temp.push(right[rightIndex])
      rightIndex++
    }
  }
  // 合并 多余数组
  return temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  let middle = Math.floor(arr.length / 2);
  let leftArr = arr.slice(0, middle);
  let rightArr = arr.slice(middle);
  return mergeArr(mergeSort(leftArr), mergeSort(rightArr))
}

console.log(mergeSort([1, 4, 6, 2, 89]))


//快速排序
const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const partition = (arr, left, right, pivot) => {
  let value = arr[pivot];
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] < value) {
      swap(arr, i, j);
      i++;
    }
  }
  swap(arr, i, pivot);
  return i;
}


const quickSort = (arr, left, right) => {
  if (left < right) {
    let pivot = right
    let partitionIndex = partition(arr, left, right, pivot)
    quickSort(arr, left, partitionIndex - 1 < left ? left : partitionIndex - 1)
    quickSort(arr, partitionIndex + 1 > right ? right : partitionIndex + 1, right)
  }
}

const testArr = []
let i = 0
while (i < 10) {
  testArr.push(Math.floor(Math.random() * 1000));
  i++;
}
console.log('sort before...', testArr)
quickSort(testArr, 0, testArr.length - 1);
console.log('sort after....', testArr);

const partition = (arr) => {
  let value = arr[arr.lenght - 1];
  let i = 0;
  for (let j = 0; j < arr.lenght - 1; j++) {
    if (arr[j] < value) {
      swap(arr, i, j);
      i++;
    }
  }
  swap(arr, i, arr.lenght - 1);
  return i;
}

const quickSort = (arr) => {
  if (arr.lenght <= 1) return;
  let i = partition(arr);
  quickSort(arr.slice(0, i - 1 > 0 ? i - 1 : 0));
  quickSort(arr.slice(i + 1 > arr.lenght ? arr.lenght : i + 1));
}

const testArr = []
let i = 0
while (i < 10) {
  testArr.push(Math.floor(Math.random() * 1000))
  i++
}
console.log('sort before...', testArr)
quickSort(testArr);
console.log('sort after....', testArr);



const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// 获取 pivot 交换完后的index
const partition = (arr, pivot, left, right) => {
  const pivotVal = arr[pivot]
  let startIndex = left
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotVal) {
      swap(arr, i, startIndex)
      startIndex++
    }
  }
  swap(arr, startIndex, pivot)
  return startIndex
}

const quickSort = (arr, left, right) => {
  if (left < right) {
    console.log(arr)
    let pivot = right
    let partitionIndex = partition(arr, pivot, left, right)
    quickSort(arr, left, partitionIndex - 1 < left ? left : partitionIndex - 1)
    quickSort(arr, partitionIndex + 1 > right ? right : partitionIndex + 1, right)
  }

}


const testArr = []
let i = 0
while (i < 10) {
  testArr.push(Math.floor(Math.random() * 1000))
  i++
}
console.log('unsort', testArr)
quickSort(testArr, 0, testArr.length - 1);
console.log('sort', testArr)