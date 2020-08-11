export default function animateInsertionSort(array) {
    const animations = [];

    // const sortedArray = array.slice().sort((a, b) => a - b);
    // insertionSort(array, animations);
    // console.log(arraysAreEqual(array, sortedArray));

    insertionSort(array, animations);

    return animations;
}

function insertionSort(array, animations) {
    for (let i = 1; i < array.length; i++) {
        animations.push(["newKey", i]);
        let j = i;
        while (j - 1 >= 0) {
            animations.push(["changeColour", j - 1]);
            if (array[j - 1] > array[j]) {
                animations.push(["swap", j]);
                swap(array, j - 1, j);
                animations.push(["revertColour", j]);
                j--;
            } else {
                animations.push(["revertColour", j - 1]);
                break;
            }
        }
        animations.push(["insertKey", j])
    }
}

function swap(array, a, b) {
    let temp = array[b];
    array[b] = array[a];
    array[a] = temp;
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