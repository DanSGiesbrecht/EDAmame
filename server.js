// server.js

// node.js packages
const http = require('http');
const url  = require('url');
const fs   = require('fs');

// npm packages
const ejs  = require('ejs');

// local
const router = require('./router.js');


const server = http.createServer();

server.on('request', (request, response) => {
  // forEach with an array of routes (or something)
  // continue only if all previous routes return false (haven't found a match)
  // if route function returns true, return
  // after end of forEach, return 404
  router.home(request, response);
});

const port = 3000;

server.on('error', e => {
  console.error(`Server error: ${e}\nShutting down.`);
  process.exit(1);
});

server.on('listening', e => {
  console.log(`Server started, listening on port ${port}`);
});

server.listen(port);
