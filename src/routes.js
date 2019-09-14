/*************************************************************
* routes.js
*************************************************************/

const fs = require('fs');
const nodePath = require('path');
const digikey = require('./digikey.js');
const helper = require('./helper.js');

module.exports = {

  static: (request, response) => {
    return new Promise((resolve, reject) => {
      let safePath = nodePath.normalize(decodeURI(request.url));
      if(helper.onPath('/static', safePath) && request.method === 'GET') {
        const mimetypes = { 'css': 'text/css', 'png': 'image/png' };
        const filePath = '.' + request.url;
        const ext = filePath.split('.').pop();
	fs.readFile(filePath, (error, content) => {
	  if(error) {
	    // 404 - handle invalid
	    resolve(false);
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

  login: (request, response) => {
    // not yet promise
    if(helper.exactPath('/login', request.url)){
      switch(request.method){
        case 'GET':

	break;
        case 'POST':

	break;
        default:
	return false;

      }
    }
  },

  oauth: async (request, response) => {
    // Note: there is no promise returned yet from getCode! It doesn't yet need it.
    if(helper.onPath('/oauth/redirect', request.url) && request.method === 'GET') {
      console.log('oauth page');
      // get OAuth code
      let code = digikey.getCode(request);
      // if code wasn't retrieved, 404 page
      if(code === null) return false;
      // request access token
      let body = await digikey.requestTokens(code);

      response.end();
      return true;
    } else { return false; }
  },

  home: async (request, response) => {
    if(helper.exactPath('/', request.url) && request.method === 'GET') {
      try {
	let data = await helper.renderEJS('./views/home.ejs');
	await helper.respond(response, {status: 200, content: 'text/html'}, data);
      } catch(error) {
	console.log(error);
      }
      return true;
    } else {
      return false;
    }
  },

  fourOhFour: async (request, response) => {
    // no routes were found
    try {
      let data = await helper.renderEJS('./views/fourOhFour.ejs');
      await helper.respond(response, {status: 404, content: 'text/html'}, data);
    } catch(error) {
      console.log(error);
    }
  }
};
