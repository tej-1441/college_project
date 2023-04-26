import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [
  { x: 1, y: 0 },
]; //dataPoints.
var xVal = 12;
var updateInterval = 5000;
export class Flow extends Component {
  constructor() {
    super();
    this.updateChart = this.updateChart.bind(this);
  }
  state = {
    currFlow: 0,
  };
  componentDidMount() {
    setInterval(this.updateChart, updateInterval);
  }
  updateChart() {
    axios
      .get(
        "https://college-project-a5fe8-default-rtdb.firebaseio.com/test/json/value/round.json"
      )
      .then((res1) => {
        const data = res1.data[xVal];
         var Flow = "";
         var count = 0;
         for (var i = 0; i < data.length; i++) {
           if (count === 5 && data[i] !== ",") {
             Flow += data[i];
           }
           if (data[i] === ",") {
             count++;
           }
         }
         Flow = +Flow;
        this.setState({ currFlow: Flow });

        dps.push({ x: xVal, y: Flow });
      })
      .catch((err) => {
        console.log(err);
      });
    if (dps.length > 10) {
      dps.shift();
    }
    xVal += 0.5;
    this.chart.render();
  }
  render() {
    const options = {
      title: {
        text: "Flow of Water Line Chart",
      },
      data: [
        {
          type: "line",
          dataPoints: dps,
        },
      ],
    };
    return (
      <div className="common">
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        <pre className="common_currvalue">
          current value of Flow:{" "}
          <span
            className={`common_currvalue_value ${
              this.state.currFlow > 40 ? "wrong" : ""
            }`}
          >
            {this.state.currFlow}
          </span>
          {this.state.currFlow > 40 ? (
            <span
              className={`${
               this.state.currFlow > 40 ? "wrong" : ""
              }`}
            >
              {" "}
              (There is overflow please check your water supply)
            </span>
          ) : (
            ""
          )}
        </pre>
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
// module.exports = Home;
