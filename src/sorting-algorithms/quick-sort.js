export default function animateQuickSort(array) {
    const animations = [];

    // const sortedArray = array.slice().sort((a, b) => a - b);
    // quickSort(array, 0, array.length - 1, animations);
    // console.log(arraysAreEqual(array, sortedArray));
    animations.push(["begin"]);
    quickSort(array, 0, array.length - 1, animations);
    animations.push(["finish"]);
    return animations;
}

function quickSort(array, left, right, animations) {

    if (left < right) {
        let pivot = partition(array, left, right, animations);
        quickSort(array, left, pivot - 1, animations);
        quickSort(array, pivot + 1, right, animations);
    }
}

function partition(array, left, right, animations) {
    animations.push(["setBoundary", left, right]);
    animations.push(["setPivot", right]);
    let pivot = array[right];

    let index = left;

    for (let i = left; i < right; i++) {
        animations.push(["curr", i]);

        if (array[i] <= pivot) {

            //animations.push(["swap", index, i]);
            animations.push(["swap", index, i]);
            if (index !== i) {
                animations.push(["greaterThan", i]);
            }
            animations.push(["smallerThan", index]);
            swap(array, index, i);
            //animations.push(["revertColour", index, i]);
            index++;
            //animations.push(["setIndex", index, index]);
        } else {
            animations.push(["greaterThan", i]);
            //animations.push(["revertColour", i, i]);
        }

    }
    animations.push(["swap", index, right]);
    animations.push(["greaterThan", right]);
    //animations.push(["revertColour", index, right]);
    swap(array, index, right);
    animations.push(["resetBoundary", 0, array.length - 1]);
    return index;
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