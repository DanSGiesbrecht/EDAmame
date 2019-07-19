/*************************************************************
* server.js
*************************************************************/
const http = require('http');
const routes = require('./routes.js');

const routeArr = Object.values(routes);

const server = http.createServer();

server.on('request', async (request, response) => {
  // if any route returns <true>, stop checking routes.
  for(let i = 0; i < routeArr.length; i++) {
    console.log(routeArr[i]);
    if(await routeArr[i](request, response)) return;
  }
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
