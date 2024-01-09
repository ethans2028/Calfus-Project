require("dotenv").config();
const express = require("express");

// express app instance
const app = express();

// middleware: convert json from post request to a javascript object
// anything written in the body will become a body object attached to the req object
app.use(express.json());

// setting up express request routing

// get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
    console.log("route handler ran");
  res.status(200).json({
    status: "success",
    data: {
      restaurants: ["mcdonalds", "wendys"],
    },
  });
});

// get one restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
  console.log(req);
  res.status(201).json({
    status: "success",
    data: {
      restaurant: "mcdonalds_get",
    },
  });
});

// create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: "success",
    data: {
      restaurant: "mcdonalds_post",
    },
  });
});

// update a restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.status(200).json({
    status: "success",
    data: {
      restaurant: "mcdonalds_put",
    },
  });
});

app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`server is up and listening on ${port}`);
});