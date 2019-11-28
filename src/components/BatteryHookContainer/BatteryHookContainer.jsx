import React, { useState, useEffect } from "react";
import Battery from "../Battery/Battery";
import { register, unregister } from "../../utils/battery";

function BatteryHookContainer() {
  const [batteryData, setBatteryData] = useState({
    //useState devuelve un arreglo de dos elementos que se vuelcan en [,]
    level: 0.44,
    charging: true
  });

  /* arriba destruturado lo de abajo (lo mismo en una sola líena)
  const arr = useState(0.55);
  const level = arr[0];
  const setLevel = arr[1];

  console.log(arr);
  */
  function updateBattery(data) {
    setBatteryData(data);
  }

  useEffect(() => {
    register(updateBattery);
    //console.log("useEffect se llamó");
    // Devuelve una función de limpieza
    return () => {
      unregister(updateBattery);
    };
  }, []); // es como el didMount y willUnmount en un componente de clase

  return (
    <>
      <Battery level={batteryData.level} charging={batteryData.charging} />
    </>
  );
}

export default BatteryHookContainer;
