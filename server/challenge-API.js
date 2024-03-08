//challenge-API.js

/*
const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const guard = require('express-jwt-permissions')();
//const jwt = require('express-jwt');
//const jwks = require("jwks-rsa");

const port = process.env.PORT || 8080;

const jwtCheck = auth({
    
  //comment
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-o34bqen6xipaqjxs.us.auth0.com/.well-known/jwks.json'

    }),
    //comment
  audience: 'https://www.challengesAPI.com',
  issuerBaseURL: 'https://dev-o34bqen6xipaqjxs.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/challenges', guard.check(['read:challenges']), function (req, res) {
    //res.send('Secured Resource');
    res.json({
      challenge1: "This is the first challenge",
      challenge2: "This is another challenge",
    })
});

app.listen(port);

console.log('Running on port ', port);

*/