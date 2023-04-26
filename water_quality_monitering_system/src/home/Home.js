import React, { useState,useEffect,useCallback } from 'react'
import { Dht } from './Dht';
import { Ph } from './Ph';
import { Flow } from './Flow';
import { Turbidity } from './Turbidity';
import Navbarcomponent from './Navbarcomponent';
import axios from 'axios';
import { send } from "emailjs-com";

function Home() {
 const[dht,setDht]=useState(0);
 const[ph,setPh]=useState(0);
 const[flow,setFlow]=useState(0);
 const[turbidity,setTurbidity]=useState(0);


const update = useCallback(() =>
            axios
              .get(
                "https://arduino-firebase-e254e-default-rtdb.firebaseio.com/test.json"
              )
              .then((res1) => {
                setDht(res1.data.int);
                console.log("executed afer 5 sec")
              })
              .catch((err) => {
                console.log(err);
              }),
  []
);

useEffect(() => {
  const t = setInterval(_ => update(), 5000)
  return () => clearInterval(t)
}, [update])



  return (
    <div>
      <Navbarcomponent/>
      <Dht/>
      <Ph/>
      <Flow/>
      <Turbidity /> 
    </div>
  )
}

export default Home