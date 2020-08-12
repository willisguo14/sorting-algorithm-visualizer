export default function animateCountingSort(array, maxNum) {
  const animations = [];

  const sortedArray = array.slice().sort((a, b) => a - b);
  //const quickSortedArray = countingSort(array, maxNum, animations);
  animations.push(["begin"]);
  countingSort(array, maxNum, animations);
  animations.push(["finish"]);
  //console.log(arraysAreEqual(array, sortedArray));

  //countingSort(array, maxNum, animations);

  return animations;
}

function countingSort(array, maxNum, animations) {
  let res = new Array(array.length);

  animations.push(["initCount"]);
  let count = new Array(maxNum).fill(0);
  //console.log(count);

  for (let i = 0; i < array.length; i++) {
    //animations.push(["curr", i, array[i] - 1]);
    animations.push(["count1", i, array[i] - 1]);
    animations.push(["count2", i, array[i] - 1]);
    count[array[i] - 1]++;
  }
  //console.log(count);

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  //console.log(count);

  for (let i = res.length - 1; i >= 0; i--) {
    res[count[array[i] - 1] - 1] = array[i];
    count[array[i] - 1]--;
  }

  for (let i = 0; i < array.length; i++) {
    array[i] = res[i];

    animations.push(["insert1", i, res[i] - 1]);
    animations.push(["insert2", i, res[i] - 1]);
  }

  //return res;
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}



/*
int[] countSort(int[] arr, int size, int max) {
  int[] output = new int[size];

  //initialize count
  int[] count = new int[max + 1];
  for (int i = 0; i < max; i++) {
    count[i] = 0;
  }

  //frequency of each input element
  for (int i = 0; i < size; i++) {
    count[arr[i]]++;
  }

  //cumulative frequency
  for (int i = 1; i < size; i++) {
    count[i] += count[i-1];
  }

  //place elements
  for (int i = size - 1; i >= 0; i--) {
    output[count[arr[i]]-1] = arr[i];
    count[arr[i]]--;
  }

  return output;
}
*/