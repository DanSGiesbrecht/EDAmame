// routes.js

const url = require('url');

// npm packages
const ejs = require('ejs');

module.exports = {
  /*static: (request, response) => {

  },*/
  home: (request, response) => {
    return new Promise((resolve, reject) => {
      const requestUrl = url.parse(request.url, true);

      switch(request.method) {
      case 'GET':
        if(requestUrl.pathname.startsWith('/')) {
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
}
