const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"; // best practices si se quiere agregar funciones que trabajen en este url principal
// lat=-34.876&lon=-61.53

export function getCurWeatherByLatLng(lat, lng) {
  const url = `${BASE_URL}?lat=${lat}&lon=${lng}&units=metric&appid=d3945aa316355ce92bb8cc10bf63e3da`;
  return fetch(url, { mode: "cors" }).then(res => res.json());
}
