import axios from "axios";

// Dynamically get the base URL based on the current location
const baseURL = window.location.origin;

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;








// import axios from "axios";

// export default axios.create({
//   baseURL: "https://nba-app-vzqb.onrender.com",
// });