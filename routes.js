/*************************************************************
* routes.js
*************************************************************/

const url = require('url');
const ejs = require('ejs');

module.exports = {
  static: (request, response) => {
    return new Promise((resolve, reject) => {
      const mimetypes = { 'css': 'text/css' };
      const filePath = '.' + request.url;
      console.log(filePath);
      if(onPath('/static', request.url) && request.method === 'GET') {
	console.log('requested /static');
	resolve(true);
      } else {
	console.log('resolve false');
	resolve(false);
      }
    });
  },
  home: (request, response) => {
    return new Promise((resolve, reject) => {
      console.log('made it here');
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
