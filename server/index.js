require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');
const serverless = require('serverless-http');


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
app.use(cors());
app.use(express.json());
// setting up express request routing

app.put('/api/v1/anomalies/:id', async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const sql = `
    UPDATE report 
    SET county = $1, state = $2, dao_member_user = $3, impact_severity = $4, reason = $5, 
        mitigation_plan = $6, clears = $7, possible_hits = $8, research_method = $9, 
        dob_redaction = $10, status = $11, last_reviewed_date = $12, issue_start_date = $13, 
        est_resolution_date = $14, links = $15, act_resolution_date = $16
    WHERE id = $17
  `;

  const values = [
    newData.county, newData.state, newData.dao_member_user, newData.impact_severity, newData.reason,
    newData.mitigation_plan, newData.clears, newData.possible_hits, newData.research_method,
    newData.dob_redaction, newData.status, newData.last_reviewed_date, newData.issue_start_date,
    newData.est_resolution_date, newData.links, newData.act_resolution_date, id
  ];

  try{
    console.log("attempting to update data")
    const datas = await pool.query(sql, values);
    res.status(200).json({
      status: "success",
      data: {
        anomalies: datas.rows,
      },
    });

  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating data'});
    console.log(err);
  }
});

app.get("/api/v1/anomalies", async (req, res) => {
  try {
    const datas = await pool.query('SELECT * FROM report');
    res.status(200).json({
      status: "success",
      datas: datas.rows.length,
      data: {
        anomalies: datas.rows,
      },
    });

  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching data'});
    console.log(err);
  }
});

app.get("/api/v1/anomalies/:id", async (req, res) => {
  try {
    console.log("fetch anomoly data by report_id")
    const { id } = req.params;
    const datas = await pool.query('SELECT * FROM report WHERE id = $1', [id]);
    res.status(200).json({
      status: "success",
      datas: datas.rows.length,
      data: {
        anomalies: datas.rows,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching data'});
    console.log(err);
  }
});

// get audit data for specified anomaly
app.get("/api/v1/anomalies/:id/changes", async (req, res) => {
  try {
    console.log("fetch audit data by report id")
    const { id } = req.params;
    const datas = await pool.query('SELECT * FROM audit_log WHERE report_id = $1', [id]);
    res.status(200).json({
      status: "success",
      datas: datas.rows.length,
      data: {
        anomalies: datas.rows,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching data'});
    console.log(err);
  }
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`server is up and listening on ${port}`);
});

module.exports.handler = serverless(app);