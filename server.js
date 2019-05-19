const http = require('http');
const url  = require('url');

const server = http.createServer();

server.on('request', (request, response) => {
  const requestUrl = url.parse(request.url, true);
});
