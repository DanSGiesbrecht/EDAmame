/*************************************************************
* routes.js
*************************************************************/

const url = require('url');
const fs = require('fs');
const ejs = require('ejs');

module.exports = {

  static: (request, response) => {
    return new Promise((resolve, reject) => {
      if(onPath('/static', request.url) && request.method === 'GET') {
        const mimetypes = { 'css': 'text/css' };
        const filePath = '.' + request.url;
        const ext = filePath.split('.').pop();
	fs.readFile(filePath, (error, content) => {
	  if(error) { /* 404 - handle invalid */ }
	  console.log('requested /static');
	  response.writeHead(200, {'Content-Type' : mimetypes[ext]});
	  response.end(content);
	  resolve(true);
	});
      } else {
	resolve(false);
      }
    });
  },

  home: (request, response) => {
    return new Promise((resolve, reject) => {
      switch(request.method) {
      case 'GET':
        if(onPath('/', request.url)) {
	  console.log('requested /');
          ejs.renderFile('./views/home.ejs', (error, content) => {
	    response.end(content);
            resolve(true);
          });
        } else {
	  resolve(false);
        }
      }
    });
  }
};

/*************************************************************
* helper functions
*************************************************************/

// onPath
function onPath(path, urlObj) {
  const reqUrl = url.parse(urlObj, true);
  return reqUrl.pathname.startsWith(path);
}
