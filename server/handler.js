'use strict';
const app = require('./app');
const serverless = require('./serverless');
module.exports.hello = serverless(app);