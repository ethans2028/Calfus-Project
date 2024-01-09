require("dotenv").config();
const express = require("express")

const app = express();

const port = process.env.PORT || 3001;
app.listen(3005, () => {
  console.log(`server is up and listening on ${port}`);
});