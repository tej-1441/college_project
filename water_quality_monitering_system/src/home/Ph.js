import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [
  { x: 1, y: 7 },
]; //dataPoints.
var xVal = 12;
var updateInterval = 5000;
export class Ph extends Component {
  constructor() {
    super();
    this.updateChart = this.updateChart.bind(this);
  }
  state = {
    currPh: 7,
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
        var ph = "";
        var count = 0;
        for (var i = 0; i < data.length; i++) {
          if (count === 3 && data[i] !== ",") {
            ph += data[i];
          }
          if (data[i] === ",") {
            count++;
          }
        }
        ph = +ph;
        console.log(data);
        console.log(ph);
        this.setState({ currPh: ph });

        dps.push({ x: xVal, y: ph });
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
        text: "Ph of Water Line Chart",
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
          current value of Ph:{" "}
          <span
            className={`common_currvalue_value ${
              this.state.currPh < 5 || this.state.currPh > 8 ? "wrong" : ""
            }`}
          >
            {this.state.currPh}
          </span>
          {this.state.currPh < 5 || this.state.currPh > 8 ? (
            <span
              className={`${
                this.state.currPh < 5 || this.state.currPh > 8 ? "wrong" : ""
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
