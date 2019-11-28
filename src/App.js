import React from "react";
import BatteryContainer from "./components/BatteryContainer/BatteryContainer";
import BatteryHookContainer from "./components/BatteryHookContainer/BatteryHookContainer";

function App() {
  return (
    <div style={styles.container}>
      <BatteryContainer />
      <BatteryHookContainer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#efe"
  }
};

export default App;
