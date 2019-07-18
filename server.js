/*************************************************************
* server.js
*************************************************************/
const http = require('http');
const routes = require('./routes.js');

const routeArr = Object.values(routes);

const server = http.createServer();

server.on('request', async (request, response) => {
  // if any route returns <true>, stop checking routes.

  // this code doesn't work: .some() doesn't work with
  // promises.
  // Must use a loop without a callback!!
  await routeArr.some(async (route) => {
    console.log(route);
    return await route(request, response);
  });

  // this code does work
  /*let found = await routes.static(request, response);
  if(!found) {
    routes.home(request, response);
  }*/
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
