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
  // if (left >= right) return;
  // let pivot = right;
  // let i = partition(arr, left, right, pivot);
  // console.log(i)
  // quickSort(arr, left, i - 1 > left ? i - 1 : left);
  // quickSort(arr, right, i + 1 < right ? i + 1 : right);
  if (left < right) {
    let pivot = right
    let partitionIndex = partition(arr, pivot, left, right)
    console.log(partitionIndex)
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
quickSort(testArr, 0, testArr.lenght - 1);
console.log('sort after....', testArr);