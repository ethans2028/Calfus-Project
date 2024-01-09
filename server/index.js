require("dotenv").config();
const express = require("express");

// express app instance
const app = express();

// middleware: convert json from post request to a javascript object
// anything written in the body will become a body object attached to the req object
app.use(express.json());

// setting up express request routing

// get all anomalies
app.get("/api/v1/anomalies", (req, res) => {
    console.log("route handler ran");
  res.status(200).json({
    status: "success",
    data: {
      anomalies: ["anomaly_1", "anomaly_2"],
    },
  });
});

// get one anomaly
app.get("/api/v1/anomalies/:id", (req, res) => {
  console.log(req);
  res.status(201).json({
    status: "success",
    data: {
      restaurant: "anomaly_get",
    },
  });
});

// create an anomaly
app.post("/api/v1/anomalies", (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: "success",
    data: {
      anomalies: "anomaly_post",
    },
  });
});

// update an anomaly
app.put("/api/v1/anomalies/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.status(200).json({
    status: "success",
    data: {
      anomalies: "anomalies_put",
    },
  });
});

// delete an anomaly
app.delete("/api/v1/anomalies/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`server is up and listening on ${port}`);
});