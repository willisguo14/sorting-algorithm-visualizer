import React from "react";

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <div className="controls-container">
          <button onClick={this.props.resetArray}>Generate new array</button>
          <div className="algo-options-container">
            <div className="algo-option">
              <input
                type="radio"
                name="algorithm"
                value="mergeSort"
                id="mergeSort"
                checked={this.props.algorithm === "mergeSort"}
                onChange={() => this.props.handleChange}
              ></input>
              <label htmlFor="mergeSort">Merge Sort</label>
            </div>
            <div className="algo-option">
              <input
                type="radio"
                name="algorithm"
                value="insertionSort"
                id="insertionSort"
                checked={this.props.algorithm === "insertionSort"}
                onChange={() => this.props.handleChange}
              ></input>
              <label htmlFor="insertionSort">Insertion Sort</label>
            </div>
          </div>
          <button onClick={this.props.sort}>SORT</button>
        </div>
    );
  }
}

export default Controls;
