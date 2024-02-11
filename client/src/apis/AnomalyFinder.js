import axios from "axios";

// create axios instance: axios formats the requests nicely
export default axios.create ({
  // baseURL is base url of our server
  baseURL: "http://localhost:3002/api/v1/anomalies"
});