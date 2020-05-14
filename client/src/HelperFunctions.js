const API_URL = () => {
  if (window.location.host.indexOf("localhost") !== -1) {
    return "http://localhost:3000";
  } else {
    return "https://sticker-mania.herokuapp.com";
  }
};

export default API_URL;
