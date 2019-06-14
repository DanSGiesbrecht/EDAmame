const http = require('http');
const url  = require('url');

const server = http.createServer();

server.on('request', (request, response) => {
  const requestUrl = url.parse(request.url, true);

  switch(request.method) {
  case 'GET':
    if(requestUrl.pathname.startsWith('/')) {
      return response.end('<p>HTML sample test</p>');
    } else {
      return response.writeHead('404').end('Page Not Found');
    }
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
