export default function aimateMergeSort(array) {
    const animations = [];

    let temp = new Array(array.length);

    const sortedArray = array.slice().sort((a, b) => a - b);
    mergeSort(array, temp, 0, array.length - 1, animations);
    console.log(arraysAreEqual(array, sortedArray));
    console.log(temp);

    //mergeSort(array, 0, array.length - 1, animations);

    return animations;
}

function mergeSort(array, temp, left, right, animations) {
    if (left === right) return;

    const mid = Math.floor((left + right) / 2);
    mergeSort(array, temp, left, mid, animations);
    mergeSort(array, temp, mid + 1, right, animations);
    merge(array, temp, left, mid, right, animations);
}

function merge(array, temp, left, mid, right, animations) {
    animations.push(["setBoundary", left, right]);

    let i = left;
    let j = mid + 1;

    let k = left;

    while (i <= mid && j <= right) {
        animations.push(["changeColour", i, j]);
        if (array[i] < array[j]) {
            animations.push(["insertTemp", k, i]);
            temp[k] = array[i];
            k++;
            i++;
        } else {
            animations.push(["insertTemp", k, j]);
            temp[k] = array[j];
            k++;
            j++;
        }
    }
    while (i <= mid) {
        animations.push(["changeColour", i, i]);
        animations.push(["insertTemp", k, i]);
        temp[k] = array[i];
        k++;
        i++;
    }
    while (j <= right) {
        animations.push(["changeColour", j, j]);
        animations.push(["insertTemp", k, j]);
        temp[k] = array[j];
        k++;
        j++;
    }

    for (let i = left; i <= right; i++) {
        animations.push(["copyBack", i, i]);
        array[i] = temp[i];
    }
    animations.push(["revertColour", left, right]);
    animations.push(["resetBoundary", 0, array.length - 1]);
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