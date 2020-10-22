import axios from "axios";

export const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

export const getUserLat = async (address) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  let response = await axios({
    method: "get",
    url: url,
  });

  return response;
};

export const getFormattedAdrr = async (lat, lng, update) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

  const response = await axios({
    method: "get",
    url: url,
  });
  if (update) {
    update(response.data.results[0].formatted_address);
  }

  return response.data.results[0].formatted_address;
};

export const getLocation = (pos) => {
  if (window.navigator) {
    let route = window.navigator.geolocation.getCurrentPosition(pos);
  }
};
