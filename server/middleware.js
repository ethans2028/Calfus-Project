//middleware.js
/*
const axios = require("axios");
const tokenEndpoint = "https://dev-o34bqen6xipaqjxs.us.auth0.com/oauth/token";


const middleware = (req,res, next) => {
    const code = req.query.code;
    if(!code) {
        res.status(401).send("Missing auth code");
    }
    const params = new URLSearchParams();
    params.append("grant_type", "auth_code");
    params.append("client_id" , "uXxWgDgDbCdSTepHD9IxfcI0qDzOEKId");
    params.append("client_secret", "WjohBBJvZYlbQjI82_rcKlyFuOUce7vgUvt6uV3hTkuXRvOZmX1CdyPeDH_IAwlu");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/challenges");

    axios.post(tokenEndpoint, params)
    .then(response => {
        req.middleware = repsonse.data;
        next();
    })
    .catch(err => {
        console.log(err);
        res.status(403).json('Reason: ${err.message}');
    })
}


module.exports = middleware;
*/