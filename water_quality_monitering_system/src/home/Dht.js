import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import axios from "axios";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import "./Common.css";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [{ x: 1, y: 90 }]; //dataPoints.
var dps1 = [{ x: 1, y: 25 }]; //dataPoints.

var xVal = 12;
var updateInterval = 5000;
export class Dht extends Component {
  constructor() {
    super();
    this.updateChart = this.updateChart.bind(this);
  }
  state = {
    currHumidity: 93,
    currTemprature:23,
    currstate:{
        name:'vishnu Verma',
        email:'vishnuvermaverma5@gmail.com',
        subject:'check your reading',
        message:'something wrong detected in reading'
        
      }
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
        var humidity ="";
        var temprature = "";
        var count=0;
        for(var i=0;i<15;i++)
        {
          if(count===0 && data[i]!==',')
          {
            humidity+=data[i];
          }
          if(count===1 && data[i]!==',')
          {
           temprature+=data[i];
          }
          if(data[i]===',')
          {
            count++;
          }
        }
        humidity=+humidity;
        temprature=+temprature;
        console.log("data", data);
        console.log("humidity",humidity);
        console.log("temprature",temprature);
        this.setState({ currHumidity: humidity });
        this.setState({ currTemprature: temprature });
      
        dps.push({ x: xVal, y: humidity });
        dps1.push({ x: xVal, y: temprature });
      })
      .catch((err) => {
        console.log(err);
      });

    if (dps.length > 10) {
      dps.shift();
    }
    if (dps1.length>10){
      dps1.shift();
    }
      xVal += 0.5;
    this.chart.render();
  }
  render() {
    const options = {
      title: {
        text: "Dht Line Chart",
      },
      data: [
        {
          type: "line",
          toolTipContent: "{name}: {y}",
          showInLegend: true,
          name: "Humidity",
          legendText: "Humidity",
          dataPoints: dps,
        },
        {
          type: "line",
          toolTipContent: "{name}: {y}",
          showInLegend: true,
          name: "Temprature",
          legendText: "Temprature",
          dataPoints: dps1,
        },
      ],
    };
    return (
      <div className="common">
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        <pre className="common_currvalue">
          current value of Humidity:{" "}
          <span
            className={`common_currvalue_value ${
              this.state.currHumidity < 100 ? "wrong" : ""
            }`}
          >
            {this.state.currHumidity}
          </span>
          <Fade>
          {this.state.currHumidity < 100 ? (
            <span className={`${this.state.currHumidity < 100 ? "wrong" : ""}`}>
              {" "}
              (something wrong please check your water supply)
            </span>
          ) : (
            ""
          )}
          </Fade>
        </pre>
        <pre className="common_currvalue second">
          current value of Temprature:{" "}
          <span
            className={`common_currvalue_value ${
              this.state.currTemprature < 24 || this.state.currTemprature > 48
                ? "wrong"
                : ""
            }`}
          >
            {this.state.currTemprature}
          </span>
          <Fade right>
          {this.state.currTemprature < 24 || this.state.currTemprature > 48 ? (
              <span
                className={`${
                  this.state.currTemprature < 24 ||
                  this.state.currTemprature > 48
                    ? "wrong"
                    : ""
                }`}
              >
                {" "}
                (something wrong please check your water supply)
              </span>
            )
            : (
            ""
          )}
          </Fade>
        </pre>
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
// module.exports = Home;
