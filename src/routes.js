/*************************************************************
* routes.js
*************************************************************/

const fs = require('fs');
const ejs = require('ejs');
const nodePath = require('path');
const digikey = require('./digikey.js');
const helper = require('./helper.js');

module.exports = {

  static: (request, response) => {
    return new Promise((resolve, reject) => {
      let safePath = nodePath.normalize(decodeURI(request.url));
      if(helper.onPath('/static', safePath) && request.method === 'GET') {
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

  oauth: (request, response) => {
    // Note: there is no promise returned yet from getCode! It doesn't yet need it.
    if(helper.onPath('/oauth/redirect', request.url) && request.method === 'GET') {
      console.log('oauth page');
      console.log('getCode: ' + digikey.getCode(request));
      response.end();
      return true;
    } else { return false; }
  },

  home: (request, response) => {
    return new Promise((resolve, reject) => {
      switch(request.method) {
      case 'GET':
        if(helper.onPath('/', request.url)) {
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
