export function getCurrentLatLng() {
  return new Promise(resolve => {
    // se puede agregar un segunda función parametro para manejar errores (resolve, reject)=>
    navigator.geolocation.getCurrentPosition(pos =>
      resolve({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    );
  });
}
