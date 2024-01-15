import axios from "axios";

export default axios.create ({
  // baseURL is base url of our server
  baseURL: "http://localhost:3001/api/v1/anomalies"
});