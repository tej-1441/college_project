import React, { useState, useEffect, useCallback } from "react";
import { Dht } from "./Dht";
import { Ph } from "./Ph";
import { Flow } from "./Flow";
import { Turbidity } from "./Turbidity";
import Navbarcomponent from "./Navbarcomponent";
import axios from "axios";
import { send } from "emailjs-com";

var xVal = 12;
var counts = 0;

function Home() {
  const [humidity, setHumidity] = useState(false);
  const [temprature, setTemprature] = useState(false);
  const [ph, setPh] = useState(false);
  const [flow, setFlow] = useState(false);
  const [turbidity, setTurbidity] = useState(false);
  const [currstate, setcurrstate] = useState({
    from_name: "college project",
    to_name: "sir",
    email: "vishnuvermaverma5@gmail.com",
    subject: "Regarding water supply",
    message: {ph: "Ph is within range",turbidity: "Turbidity is within range",flow: "Flow is fine",},
  });
  const currstate1 = {
    from_name: "college project",
    to_name: "sir",
    email: "vishnuvermaverma5@gmail.com",
    subject: "Regarding water supply",
    message:"something wrong with water supply please check"
  };
  const update = useCallback(() =>
    axios
      .get(
        "https://college-project-a5fe8-default-rtdb.firebaseio.com/test/json/value/round.json"
      )
      .then((res1) => {
        const data = res1.data[xVal];
        var newhumidity = "";
        var newtemprature = "";
        var newph = "";
        var newflow = "";
        var newturbidity = "";
        var count = 0;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          if (count === 0 && data[i] !== ",") {
            newhumidity += data[i];
          }
          if (count === 1 && data[i] !== ",") {
            newtemprature += data[i];
          }
          if (count === 3 && data[i] !== ",") {
            newph += data[i];
          }
          if (count === 4 && data[i] !== ",") {
            newturbidity += data[i];
          }
          if (count === 5 && data[i] !== ",") {
            newflow += data[i];
          }
          if (data[i] === ",") {
            count++;
          }
        }

        newhumidity = +newhumidity;
        newflow = +newflow;
        newph = +newph;
        newtemprature = +newtemprature;
        newturbidity = +newturbidity;
        console.log(
          "values",
          newhumidity,
          newflow,
          newph,
          newtemprature,
          newturbidity
        );
        if (newflow > 40) {
          setFlow(true);
          setcurrstate({
            ...currstate,
            message: {
              ...currstate.message,
              flow: "overflow happened",
            },
          });
        }
        if (newtemprature < 24 || newtemprature > 48) {
          setTemprature(true);
        }
        if (newturbidity < 0 || newturbidity > 1000) {
          setTurbidity(true);
          setcurrstate({
            ...currstate,
            message: {
              ...currstate.message,
              turbidity: "turbidity is out of required range",
            },
          });
          console.log("turbidity", turbidity);
        }
        if (newph < 5 || newph > 8) {
          setPh(true);
          if (newph < 5) {
            setcurrstate({
              ...currstate,
              message: {
                ...currstate.message,
                ph: "ph is below 5",
              },
            });
          }
          if (newph > 8) {
            setcurrstate({
              ...currstate,
              message: {
                ...currstate.message,
                ph: "ph is above 8",
              },
            });
          }
        }
        // console.log("newhumidity",newhumidity);
        console.log(
          "current value of different parameter",
          flow,
          humidity,
          ph,
          turbidity,
          temprature
        );
        xVal++;
        counts++;
        console.log(counts, xVal);
        if (counts === 12) {
          if (flow || humidity || ph || turbidity || temprature) {
            console.log(currstate.message);
            send(
              "service_bdi6y9t",
              "template_032sc8m",
              currstate1,
              "4n9xoZItg8LpZ-2la"
            );
          }
          counts = 0;
          setFlow(0);
          setPh(0);
          setTemprature(0);
          setTurbidity(0);
          setHumidity(0);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  );

  useEffect(() => {
    const t = setInterval((_) => update(), 5000);
    return () => clearInterval(t);
  }, [update]);

  return (
    <div>
      <Navbarcomponent />
      <Dht />
      <Ph />
      <Flow />
      <Turbidity />
    </div>
  );
}

export default Home;
