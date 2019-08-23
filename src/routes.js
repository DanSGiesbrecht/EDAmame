/*************************************************************
* routes.js
*************************************************************/

const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const nodePath = require('path');

module.exports = {

  static: (request, response) => {
    return new Promise((resolve, reject) => {
      let safePath = nodePath.normalize(decodeURI(request.url));
      if(onPath('/static', safePath) && request.method === 'GET') {
        const mimetypes = { 'css': 'text/css' };
        const filePath = '.' + request.url;
        const ext = filePath.split('.').pop();
	fs.readFile(filePath, (error, content) => {
	  if(error) {
	    /* 404 - handle invalid */
	  }
	  else {
	    response.writeHead(200, {'Content-Type' : mimetypes[ext]});
	    response.end(content);
	    resolve(true);
	  }
	});
      }
      else {
	resolve(false);
      }
    });
  },

  home: (request, response) => {
    return new Promise((resolve, reject) => {
      switch(request.method) {
      case 'GET':
        if(onPath('/', request.url)) {
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
