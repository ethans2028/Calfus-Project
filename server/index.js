require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');
const {auth, requiresAuth} = require("express-openid-connect");
const axios = require('axios')
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');


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

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'ewjof4oy983ryf9pwhrf3829h9dndj021hdwnqp21d893',
  baseURL: 'http://localhost:3001/api/v1/anomalies', 
  clientID: 'aeP5JpgwYxGAjJrWc0zLTEHXKMUcoSTo',
  issuerBaseURL: 'https://dev-o34bqen6xipaqjxs.us.auth0.com', 
};



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

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token, or no token supplied!');
  } else {
    next(err);
  }
});



const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-o34bqen6xipaqjxs.us.auth0.com/.well-known/jwks.json`
  }),
  audience: 'http://localhost:5000',
  issuer: `https://dev-o34bqen6xipaqjxs.us.auth0.com/`,
  algorithms: ['RS256']
});


app.get('/api/v1/anomalies/api/protected', checkJwt, (req, res) => {
     res.json({ message: 'This is a protected route' });
});


app.get('/api/v1/anomalies/checkAuth', checkJwt, (req,res) => {
  res.status(200);
})


app.put("/api/v1/anomalies/new", async(req, res) => {
  const newData = req.body;
  const sql = `
    INSERT INTO report 
    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    ON CONFLICT DO NOTHING
    RETURNING id
  `;

  const values = [
    newData.county, newData.state, newData.dao_member_user, newData.impact_severity, newData.reason,
    newData.mitigation_plan, newData.clears, newData.possible_hits, newData.research_method,
    newData.dob_redaction, newData.status, newData.last_reviewed_date, newData.issue_start_date,
    newData.est_resolution_date, newData.links, newData.act_resolution_date
  ];

  try{
    console.log("attempting to add data")
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
})

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



app.put("/api/v1/anomalies/:id/changes", async(req, res) => {
  const {id} = req.params;
  const newData = req.body;
  const sql = `
  INSERT INTO audit_log 
  VALUES (default, $1, $2, $3, $4, $5, $6)
  ON CONFLICT DO NOTHING
  `;

  const values = [newData.report_id, newData.datetime, newData.member, newData.change, newData.county, newData.state];


  try{
    console.log("attempting to update audit data")
    const datas = await pool.query(sql, values);
    res.status(200).json({
      status: "success",
      data: {
        anomalies: datas.rows,
      },
    });
    console.log('success')
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating data'});
    console.log(err);
  }
})

app.get("/api/v1/anomalies/", checkJwt, async (req, res) => {
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

app.get('/api/v1/anomalies/test', async (req, res) => {
  return res.status(200);
})


// Handle the callback route (/callback) to exchange authorization code for an access token
app.post('/callback', async (req, res) => {
  console.log("entered app.post/callback");
  res.status(501).json({ success: false });
  try {
    console.log("entered try");
    const { code } = req.body;
    console.log("redreived body");
    // Make a request to Auth0's token endpoint to exchange the authorization code for an access token
    const response = await axios.post('https://dev-o34bqen6xipaqjxs.us.auth0.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: config.clientID,
      client_secret: config.secret,
      code: code,
      //redirect_uri: `http://localhost:${port}/callback`
      redirect_uri: `http://localhost:3001/callback`
    });
    console.log("received response");

    // Check if the token exchange was successful
    if (response.data && response.data.access_token) {
      // Redirect the user to /cic after successful authentication
      res.json({ success: true });
    } else {
      console.log('Authorization code exchange failed');
      res.status(500).json({ success: false });
    }
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error);
    res.status(500).json({ success: false });
  }
});





const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`server is up and listening on ${port}`);
});





