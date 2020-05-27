
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

function merge(arr1,arr2) { 
  let result = [];
  let i = 0, j = 0;
 while(i<arr1.length && j< arr2.length) { 
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else { 
      result.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) { 
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) { 
    result.push(arr2[j]);
    j++;
  }
  return result;
}

function mergeSort(arr, p, q) { 
  if (p >= q) return;
  let n = (p + q) / 2;
  

}


//快速排序