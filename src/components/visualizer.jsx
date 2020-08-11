import React from "react";
import "./visualizer.css";

import Controls from "./controls";

import animateInsertionSort from "../sorting-algorithms/insertion-sort";
import animateMergeSort from "../sorting-algorithms/merge-sort";
import animateQuickSort from "../sorting-algorithms/quick-sort";
import animateBubbleSort from "../sorting-algorithms/bubble-sort";
import animateCountingSort from "../sorting-algorithms/counting-sort";

const NUM_ELEMENTS = 10;
const MIN = 1;
const MAX = 15;
const SCALE = 5;

const ANIMATION_SPEED = 50;

const COLOUR_1 = "#3fc1c9";
const COLOUR_2 = "#fc5185";
const COLOUR_3 = "#364f6b";

export default class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      algorithm: "countingSort",
    };

    this.resetArray = this.resetArray.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sort = this.sort.bind(this);
  }

  render() {
    const arrayComponents = this.state.array.map((value, index) => {
      return (
        <div
          className="main-array-bar"
          key={index}
          style={{
            backgroundColor: COLOUR_1,
            height: `${value * SCALE}px`,
          }}
        ></div>
      );
    });

    //const tempArray = new Array(NUM_ELEMENTS).fill(0);
    const tempArray = new Array().fill(0);
    if (this.state.algorithm === "countingSort") {
      tempArray.length = MAX;
      tempArray.fill(0);
    } else {
      tempArray.length = NUM_ELEMENTS;
      tempArray.fill(0);
    }
    const tempArrayComponents = tempArray.map((value, index) => {
      return (
        <div
          className="temp-array-bar"
          key={index}
          style={{
            backgroundColor: COLOUR_2,
            height: `${value * SCALE}px`,
          }}
        >
          <p className="temp-array-text"></p>
        </div>
      );
    });
    return (
      <div>
        {/* <Controls
          resetArray={this.resetArray}
          handleChange={this.handleChange}
          algorithm={this.state.algorithm}
          sort={this.sort}
        ></Controls> */}
        <div className="controls-container">
          <button onClick={this.resetArray}>Generate new array</button>
          <div className="algo-options-container">
            <div className="algo-option">
              <input
                type="radio"
                name="algorithm"
                value="insertionSort"
                id="insertionSort"
                checked={this.state.algorithm === "insertionSort"}
                onChange={this.handleChange}
              ></input>
              <label htmlFor="insertionSort">Insertion</label>
            </div>
            <div className="algo-option">
              <input
                type="radio"
                name="algorithm"
                value="bubbleSort"
                id="bubbleSort"
                checked={this.state.algorithm === "bubbleSort"}
                onChange={this.handleChange}
              ></input>
              <label htmlFor="bubbleSort">Bubble</label>
            </div>
            <div className="algo-option">
              <input
                type="radio"
                name="algorithm"
                value="mergeSort"
                id="mergeSort"
                checked={this.state.algorithm === "mergeSort"}
                onChange={this.handleChange}
              ></input>
              <label htmlFor="mergeSort">Merge</label>
            </div>
            <div className="algo-option">
              <input
                type="radio"
                name="algorithm"
                value="quickSort"
                id="quickSort"
                checked={this.state.algorithm === "quickSort"}
                onChange={this.handleChange}
              ></input>
              <label htmlFor="quickSort">Quick</label>
            </div>
            <div className="algo-option">
              <input
                type="radio"
                name="algorithm"
                value="countingSort"
                id="countingSort"
                checked={this.state.algorithm === "countingSort"}
                onChange={this.handleChange}
              ></input>
              <label htmlFor="countingSort">Counting</label>
            </div>
          </div>
          <button onClick={this.sort}>SORT</button>
        </div>

        <div className="array-container" style={{ height: `${MAX * SCALE}px` }}>
          {arrayComponents}
        </div>
        <div className="array-container" style={{ height: `${MAX * SCALE}px` }}>
          {tempArrayComponents}
        </div>
      </div>
    );
  }

  //SORT
  sort() {
    switch (this.state.algorithm) {
      case "mergeSort":
        this.mergeSort();
        break;
      case "insertionSort":
        this.insertionSort();
        break;
      case "bubbleSort":
        this.bubbleSort();
        break;
      case "quickSort":
        this.quickSort();
        break;
      case "countingSort":
        this.countingSort();
        break;
    }
    document.getElementsByClassName(
      "algo-options-container"
    )[0].style.visibility = "visibile";
  }

  countingSort() {
    console.log(this.state.array);
    const animations = animateCountingSort(this.state.array, MAX);

    console.log(this.state.array);

    const mainArray = document.getElementsByClassName("main-array-bar");
    const tempArray = document.getElementsByClassName("temp-array-bar");
    const count = document.getElementsByClassName("temp-array-text");

    //parseInt(value) + 1

    for (let i = 0; i < animations.length; i++) {
      const [action, index1, index2] = animations[i];

      switch (action) {
        case "initCount":
          setTimeout(() => {
            for (let i = 0; i < MAX; i++) {
              tempArray[i].style.height = `${(i + 1) * SCALE}px`;
              tempArray[i].style.backgroundColor = COLOUR_1;
              count[i].innerHTML = 0;
            }
          }, i * ANIMATION_SPEED);
          break;
        // case "curr":
        //   setTimeout(() => {
        //     mainArray[index1].style.backgroundColor = COLOUR_2;
        //     tempArray[index2].style.backgroundColor = COLOUR_2;
        //     count[index2].style.color = COLOUR_2;
        //   }, i * ANIMATION_SPEED);
        //   break;
        case "count1":
          setTimeout(() => {
            mainArray[index1].style.backgroundColor = COLOUR_2;
            tempArray[index2].style.backgroundColor = COLOUR_2;
            count[index2].style.color = COLOUR_2;
            //mainArray[index1].style.height = "0px";
            count[index2].innerHTML = parseInt(count[index2].innerHTML) + 1;
          }, i * ANIMATION_SPEED);
          break;
        case "count2":
          setTimeout(() => {
            mainArray[index1].style.height = "0px";
            tempArray[index2].style.backgroundColor = COLOUR_1;
            count[index2].style.color = COLOUR_3;
          }, i * ANIMATION_SPEED);
          break;
        case "insert1":
          setTimeout(() => {
            tempArray[index2].style.backgroundColor = COLOUR_2;
            count[index2].style.color = COLOUR_2;
            mainArray[index1].style.height = `${
              this.state.array[index1] * SCALE
            }px`;
            mainArray[index1].style.backgroundColor = COLOUR_2;
            count[index2].innerHTML = parseInt(count[index2].innerHTML) - 1;
          }, i * ANIMATION_SPEED);
          break;
        case "insert2":
          setTimeout(() => {
            mainArray[index1].style.backgroundColor = COLOUR_1;
            count[index2].style.color = COLOUR_3;
            tempArray[index2].style.backgroundColor = COLOUR_1;
          }, i * ANIMATION_SPEED);
          break;
      }
    }
  }

  quickSort() {
    const animations = animateQuickSort(this.state.array);

    const mainArray = document.getElementsByClassName("main-array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [action, index1, index2] = animations[i];
      //console.log(`${action} / ${index1} / ${index2}`);
      switch (action) {
        case "setBoundary":
          setTimeout(() => {
            console.log(`setBoundary + ${index1} + ${index2}`);
            for (let i = 0; i < NUM_ELEMENTS; i++) {
              if (i < index1 || i > index2) {
                mainArray[i].style.opacity = "0.25";
              }
            }
          }, i * ANIMATION_SPEED);
          break;
        case "setPivot":
          setTimeout(() => {
            console.log(`setPivot ${index1}`);
            mainArray[index1].style.backgroundColor = "pink";
          }, i * ANIMATION_SPEED);
          break;
        case "curr":
          setTimeout(() => {
            console.log(`curr ${index1}`);
            mainArray[index1].style.backgroundColor = "yellow";
          }, i * ANIMATION_SPEED);
          break;
        case "swap":
          setTimeout(() => {
            console.log(`swap ${index1} and ${index2}`);
            const style1 = mainArray[index1].style;
            const style2 = mainArray[index2].style;

            const height1 = mainArray[index1].style.height;
            const height2 = mainArray[index2].style.height;

            mainArray[index2].style.height = height1;
            mainArray[index1].style.height = height2;

            const backgroundColor1 = mainArray[index1].style.backgroundColor;
            const backgroundColor2 = mainArray[index2].style.backgroundColor;

            mainArray[index1].style.backgroundColor = backgroundColor2;
            mainArray[index2].style.backgroundColor = backgroundColor1;
          }, i * ANIMATION_SPEED);
          break;
        case "greaterThan":
          setTimeout(() => {
            console.log(`greaterThan ${index1}`);
            mainArray[index1].style.backgroundColor = "red";
          }, i * ANIMATION_SPEED);
          break;
        case "smallerThan":
          setTimeout(() => {
            console.log(`smallerThan ${index1}`);
            mainArray[index1].style.backgroundColor = "green";
          }, i * ANIMATION_SPEED);
          break;
        case "resetBoundary":
          setTimeout(() => {
            console.log(`resetBoundary from ${index1} to ${index2}`);
            for (let i = index1; i <= index2; i++) {
              mainArray[i].style.opacity = "1";
              mainArray[i].style.backgroundColor = COLOUR_1;
            }
          }, i * ANIMATION_SPEED);
          break;
      }
    }
  }
  bubbleSort() {
    const animations = animateBubbleSort(this.state.array);

    const mainArray = document.getElementsByClassName("main-array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [action, index1, index2] = animations[i];

      switch (action) {
        case "changeColour":
          setTimeout(() => {
            mainArray[index1].style.backgroundColor = COLOUR_2;
            mainArray[index2].style.backgroundColor = COLOUR_2;
          }, i * ANIMATION_SPEED);
          break;
        case "swap":
          setTimeout(() => {
            const height1 = mainArray[index1].style.height;
            const height2 = mainArray[index2].style.height;

            mainArray[index2].style.height = height1;
            mainArray[index1].style.height = height2;
          }, i * ANIMATION_SPEED);
          break;
        case "revertColour":
          setTimeout(() => {
            mainArray[index1].style.backgroundColor = COLOUR_1;
            mainArray[index2].style.backgroundColor = COLOUR_1;
          }, i * ANIMATION_SPEED);
          break;
      }
    }
  }
  mergeSort() {
    const animations = animateMergeSort(this.state.array);

    const mainArray = document.getElementsByClassName("main-array-bar");
    const tempArray = document.getElementsByClassName("temp-array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [action, index1, index2] = animations[i];

      switch (action) {
        case "setBoundary":
          setTimeout(() => {
            for (let i = 0; i < NUM_ELEMENTS; i++) {
              if (i < index1 || i > index2) {
                mainArray[i].style.opacity = "0.25";
              }
            }
          }, i * ANIMATION_SPEED);
          break;
        case "changeColour":
          setTimeout(() => {
            console.log(`change colour ${index1} and ${index2}`);
            mainArray[index1].style.backgroundColor = COLOUR_2;
            mainArray[index2].style.backgroundColor = COLOUR_2;
          }, i * ANIMATION_SPEED);
          break;
        case "insertTemp":
          setTimeout(() => {
            console.log(`insert temp at ${index1} from ${index2}`);
            tempArray[index1].style.height = mainArray[index2].style.height;
            mainArray[index2].style.height = "0px";
          }, i * ANIMATION_SPEED);
          break;
        case "copyBack": {
          setTimeout(() => {
            console.log("copy back");
            mainArray[index1].style.height = tempArray[index1].style.height;
            tempArray[index1].style.height = "0px";
          }, i * ANIMATION_SPEED);
          break;
        }
        case "revertColour":
          setTimeout(() => {
            console.log("revert colour");
            for (let i = index1; i <= index2; i++) {
              mainArray[i].style.backgroundColor = COLOUR_1;
            }
          }, i * ANIMATION_SPEED);
          break;
        case "resetBoundary": {
          setTimeout(() => {
            for (let i = index1; i <= index2; i++) {
              mainArray[i].style.opacity = "1";
            }
          }, i * ANIMATION_SPEED);
        }
      }
    }

    // const mainArray = document.getElementsByClassName("main-array-bar");
    // const tempArray = document.getElementsByClassName("temp-array-bar");
    // mainArray[1].style.height = "0px";
    // tempArray[1].style.height = `${this.state.array[1] * SCALE}px`;
  }
  insertionSort() {
    const animations = animateInsertionSort(this.state.array);

    const mainArray = document.getElementsByClassName("main-array-bar");
    const tempArray = document.getElementsByClassName("temp-array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [action, index] = animations[i];
      switch (action) {
        case "newKey":
          setTimeout(() => {
            tempArray[index].style.height = mainArray[index].style.height;
            mainArray[index].style.height = "0px";
            //console.log("new key!" + index);
          }, i * ANIMATION_SPEED);
          break;
        case "changeColour":
          setTimeout(() => {
            mainArray[index].style.backgroundColor = COLOUR_2;
            //console.log("change colour!" + index);
          }, i * ANIMATION_SPEED);
          break;
        case "swap":
          setTimeout(() => {
            mainArray[index].style.height = mainArray[index - 1].style.height;
            mainArray[index - 1].style.height = "0px";
            tempArray[index - 1].style.height = tempArray[index].style.height;
            tempArray[index].style.height = "0px";
            //console.log("swap!" + index);
          }, i * ANIMATION_SPEED);
          break;
        case "revertColour":
          setTimeout(() => {
            mainArray[index].style.backgroundColor = COLOUR_1;
            //console.log("revert colour!" + index);
          }, i * ANIMATION_SPEED);
          break;
        case "insertKey":
          setTimeout(() => {
            mainArray[index].style.height = tempArray[index].style.height;
            tempArray[index].style.height = "0px";
            mainArray[index].style.backgroundColor = COLOUR_1;
            //console.log("insert key!" + index);
          }, i * ANIMATION_SPEED);
          break;
      }
    }
  }

  //ARRAY
  componentDidMount() {
    this.resetArray();
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < NUM_ELEMENTS; i++) {
      array.push(randomInt(MIN, MAX));
    }
    this.setState({ array });
  }

  //SELECT ALGORITHM
  handleChange = (event) => {
    const tempArray = document.getElementsByClassName("temp-array-bar");
    const count = document.getElementsByClassName("temp-array-text");
    for (let i = 0; i < tempArray.length; i++) {
      tempArray[i].style.height = "0px";
      count[i].innerHTML = "";
    }
    if (isSorted(this.state.array)) this.resetArray();
    this.setState({
      algorithm: event.target.value,
    });
  };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isSorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
      break;
    }
  }
  return true;
}
