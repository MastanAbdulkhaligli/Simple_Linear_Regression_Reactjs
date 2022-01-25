import React, { useState, useRef } from "react";
import regression from "regression";
import "./Regression.css";
import Plot from "react-plotly.js";

const SimpleLinear = () => {
  // useRef Hooks
  const inputX = useRef(null);
  const inputY = useRef(null);
  const predict = useRef(null);

  // useState
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [predicted, setPredicted] = useState(0);
  const [data, setData] = useState();
  const [model, setModel] = useState();
  const [intercept, setIntercept] = useState();
  const [coefficient, setCoefficient] = useState();

  //   const result = regression.linear(data);
  const result = regression.linear([
    [0, 1],
    [32, 67],
    [12, 79],
  ]);
  const gradient = result.equation[0];
  const yIntercept = result.equation[1];

  // When "Calculate" buttons clicked this function will be called
  const showValues = (x, y) => {
    // Converting str to array
    const X_arr = x.split(",").map(Number);
    const Y_arr = y.split(",").map(Number);

    // Setting values to x and ystates
    setX(X_arr);
    setY(Y_arr);

    // Converting 2 d data for regression
    var data = X_arr.map(function (v, i) {
      return [v, Y_arr[i]];
    });

    // Assigning data to "data" state
    setData(data);

    // calling regression
    const result = regression.linear(data);
    setModel(result);
    const gradient = result.equation[0];
    setCoefficient(gradient);
    const yIntercept = result.equation[1];
    setIntercept(yIntercept);
    // console.log(result.predict());
  };

  return (
    <div>
      <div className="container">
        <h2>
          Y:intercept {intercept} Coefficient {coefficient}
        </h2>

        <div>
          <Plot
            data={[
              {
                x: x,
                y: y,
                type: "scatter",
              },
            ]}
            layout={{
              width: 500,
              height: 350,
              title: "Scatterplot of Given Data",
            }}
          />
        </div>

        <input
          className="inp"
          type="text"
          placeholder="Enter X values: 10,15,20 "
          ref={inputX}
        />
        <input
          className="inp"
          type="text"
          placeholder="Enter Y values: 20,30,40 "
          ref={inputY}
        />

        <div>
          <button
            onClick={() => {
              showValues(inputX.current.value, inputY.current.value);
            }}
            className="button-9"
          >
            Train Model
          </button>

          <div>
            <input
              className="inp_pr"
              type="text"
              placeholder="Enter x value: "
              ref={predict}
            />
            <button
              onClick={() => {
                setPredicted(model.predict(predict.current.value));
                console.log(model.predict(predict.current.value)[1]);
                console.log(predict);
              }}
              className="button-9-pr"
            >
              Predict
            </button>
            <div>
              {predicted === 0 ? (
                <h1 className="output">Predicted: {}</h1>
              ) : (
                <h1 className="output">Predicted: {predicted[1]}</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLinear;
