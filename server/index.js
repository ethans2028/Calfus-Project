require("dotenv").config();
const express = require("express");

const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

const fetch_cic_data = () => {
  console.log("fetch cic data")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM report', (err, res) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(res.rows)
      }
    })
  }) 
}

const fetch_audit_data = (state, county) => {
  console.log(`fetch audit data where state=${state} and county=${county}`)
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM audit_log WHERE state = $1 AND county = $2 LIMIT 1`, [state, county], (err, res) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(res.rows)
      }
    })
  }) 
}

const fetch_county_data = (state, county) => {
  console.log("fetch county data")
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM report WHERE state = $1 AND county = $2 LIMIT 1`, [state, county], (err, res) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(res.rows)
      }
    })
  }) 
}



// express app instance
const app = express();

// middleware: convert json from post request to a javascript object
// anything written in the body will become a body object attached to the req object
app.use(express.json());

// setting up express request routing

app.get("/cic", async (req, res) => {
  try {
    const data = await fetch_cic_data();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});


app.get("/audit", async (req, res) => {
  try {
    const data = await fetch_audit_data('CA', 'Sacramento');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get("/county", async (req, res) => {
  try {
    const data = await fetch_county_data('CA', 'San Joaquin');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`server is up and listening on ${port}`);
});