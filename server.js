// server.js

// node.js packages
const http = require('http');

// local modules
const routes = require('./routes.js');


const server = http.createServer();

// can the callback function be async??
server.on('request', async (request, response) => {
  // forEach with an array of routes (or something)
  // continue only if all previous routes return false (haven't found a match)
  // if route function returns true, return
  // after end of forEach, return 404
  await routes.home(request, response);
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
