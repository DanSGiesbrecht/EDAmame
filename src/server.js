/*************************************************************
* server.js
*************************************************************/
const https  = require('https');
const fs     = require('fs');
const routes = require('./routes.js');

const routeArr = Object.values(routes);
const options = {
  key:  fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
const server = https.createServer(options);

server.on('request', async (request, response) => {
  // if any route returns <true>, stop checking routes.
  for(let i = 0; i < routeArr.length; i++) {
    console.log(routeArr[i]);
    if(await routeArr[i](request, response)) return;
  }
  console.log("page wasn't found");
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
