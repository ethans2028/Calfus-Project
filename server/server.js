require("dotenv").config();
const express = require("express")

// express app instance
const app = express();

// setting up express request routing
app.get("/getRestaurants", (req, res) => {
  console.log("get all restaurants");
})

const port = process.env.PORT || 3001;
app.listen(3005, () => {
  console.log(`server is up and listening on ${port}`);
});