function geolocationSupport() {
  /*   if('geolocation' in navigator) {
        return true
    }
    return false */
  return "geolocation" in navigator;
}

const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 100000,
}

export function getCurrentPosition(options = defaultOptions) {
  if (!geolocationSupport())
    throw new Error("There is no geolocation support in your browser");

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      resolve(position);
    }, () => {
        reject('No hemos podido obtener tu ubicacion')
    }, options);
  });
}

export async function getLatLon(options = defaultOptions) {
    try {
        const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options)
        return {lat, lon, isError: false}
    }catch {
        return {isError: true, lat: null, lon: null}
    }
}