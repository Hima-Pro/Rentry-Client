"use strict";
process.env.NODE_ENV = "production";
var lib = require('./dist/index.js');
var server = require('./server/index.js');

if (process.env.APP == "SERVER") {
  module.exports = server;
} else {
  module.exports = lib;
}