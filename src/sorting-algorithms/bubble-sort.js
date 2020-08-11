export default function animateBubbleSort(array) {
    const animations = [];

    // const sortedArray = array.slice().sort((a, b) => a - b);
    // bubbleSort(array, animations);
    // console.log(arraysAreEqual(sortedArray, array));

    bubbleSort(array, animations);

    return animations;
}

function bubbleSort(array, animations) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            animations.push(["changeColour", j, j + 1]);
            if (array[j] > array[j + 1]) {
                animations.push(["swap", j, j + 1]);
                swap(array, j, j + 1);
            }
            animations.push(["revertColour", j, j + 1]);
        }
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