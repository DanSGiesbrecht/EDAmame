/*************************************************************
* helper.js
*************************************************************/
const url = require('url');
const qs  = require('querystring');
const ejs = require('ejs');

module.exports = {

  onPath: (path, urlObj) => {
    const reqUrl = url.parse(urlObj, true);
    return reqUrl.pathname.startsWith(path);
  },

  exactPath: (path, urlObj) => {
    const reqUrl = url.parse(urlObj, true);
    if(path === reqUrl.pathname){
      return true;
    } else return false;
  },

  queryData: (urlObj) => {
    return url.parse(urlObj, true).query;
  },

  renderEJS: (filePath) => {
    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, (error, content) => {
	if(error){
	  reject(error);
	} else {
	  resolve(content);
	}
      });
    });
  },

  // add reject timeout?
  respond: (response, head, data) => {
    return new Promise((resolve, reject) => {
      response.writeHead(head.status, {'Content-Type': head.content});
      response.end(data, () => { resolve(); });
    });
  },

  parseForm: (request) => {
    return new Promise((resolve, reject) => {
      let chunks = [];
      request.on('data', (chunk) => chunks.push(chunk));
      request.on('end', () => {
	const body = Buffer.concat(chunks).toString();
	resolve(qs.parse(body));
      });
    });
  }
};
