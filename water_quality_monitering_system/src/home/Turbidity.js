import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [{ x: 1, y: 200 }]; //dataPoints.
var upda = 20;
var xVal = 12;
var updateInterval = 5000;
export class Turbidity extends Component {
  constructor() {
    super();
    this.updateChart = this.updateChart.bind(this);
  }
  state = {
    currTurbidity: 3000,
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
        var Turbidity = "";
        var count = 0;
        for (var i = 0; i < data.length; i++) {
          if (count === 4 && data[i] !== ",") {
            Turbidity += data[i];
          }
          if (data[i] === ",") {
            count++;
          }
        }
        Turbidity = +Turbidity;
        // console.log("turbidity", Turbidity);
        this.setState({ currTurbidity: Turbidity });
        dps.push({ x: xVal, y: Turbidity });
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
        text: "Turbidity of Water Line Chart",
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
          current value of Turbidity:{" "}
          <span
            className={`common_currvalue_value ${
              this.state.currTurbidity < 0 || this.state.currTurbidity > 1000
                ? "wrong"
                : ""
            }`}
          >
            {this.state.currTurbidity}
          </span>
          {this.state.currTurbidity < 0 || this.state.currTurbidity > 1000 ? (
            <span
              className={`${
                this.state.currTurbidity < 0 || this.state.currTurbidity > 1000
                  ? "wrong"
                  : ""
              }`}
            >
              {" "}
              (something wrong please check your water supply)
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
