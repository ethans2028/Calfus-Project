'use strict';
const index = require('./index.js');
const serverless = require('serverless-http');
module.exports.hello = serverless(index);