require("dotenv").config();
const express = require("express");

// express app instance
const app = express();

// middleware test
app.use((req, res, next) => {
  console.log("yay our middleware works!");
  next();
});

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
});

// create a restaurant
app.post("/api/v1/restaurants", (req, res) => {});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on ${port}`);
});