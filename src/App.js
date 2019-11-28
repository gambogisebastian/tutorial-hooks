import React, { Component } from "react";
import BatteryContainer from "./components/BatteryContainer/BatteryContainer";
import BatteryHookContainer from "./components/BatteryHookContainer/BatteryHookContainer";
import "./App.css";
import Map from "./components/Map/Map";
import { getCurrentLatLng } from "../src/services/geolocation";

class App extends Component {
  state = {
    lat: null,
    lng: null
  };

  async componentDidMount() {
    // destructuración de un objeto:
    const { lat, lng } = await getCurrentLatLng();
    console.log(lat, lng);
    this.setState({ lat, lng });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">REACT WEATHER</header>
        <Map lat={this.state.lat} lng={this.state.lng} />
        <div style={styles.container}>
          <BatteryContainer />
          <BatteryHookContainer />
        </div>
      </div>
    );
  }
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
