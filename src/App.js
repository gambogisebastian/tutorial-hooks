import React, { Component } from "react";
import BatteryContainer from "./components/BatteryContainer/BatteryContainer";
import BatteryHookContainer from "./components/BatteryHookContainer/BatteryHookContainer";
import "./App.css";
import Map from "./components/Map/Map";
import { getCurrentLatLng } from "../src/services/geolocation";
import { getCurWeatherByLatLng } from "../src/services/clima";

class App extends Component {
  state = {
    lat: null,
    lng: null,
    temp: null,
    icon: ""
  };

  //patrón de uso de api del servidor - ver geolocation.js
  async componentDidMount() {
    // destructuración de un objeto:
    const { lat, lng } = await getCurrentLatLng();
    // console.log(lat, lng);
    const datosClima = await getCurWeatherByLatLng(lat, lng);
    console.log(datosClima);
    this.setState({
      lat,
      lng,
      temp: Math.round(datosClima.main.temp),
      icon: datosClima.weather[0].icon
    });
  }

  render() {
    return (
      <div className="App">
        <Map lat={this.state.lat} lng={this.state.lng} />
        <div style={styles.container}>
          <BatteryContainer />
          <BatteryHookContainer />
        </div>
        <header className="App-header">
          <div>{this.state.temp}&deg;C</div>
          REACT WEATHER
          {this.state.icon && (
            <img
              src={`https://openweathermap.org/img/w/${this.state.icon}.png`}
              alt="Estado del clima"
            />
          )}
        </header>
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
