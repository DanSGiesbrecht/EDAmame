// routes.js

const url = require('url');

// npm packages
const ejs = require('ejs');

module.exports = {
  static: (request, response) => {

  },
  home: async (request, response) => {
    const requestUrl = url.parse(request.url, true);

    switch(request.method) {
    case 'GET':
      if(requestUrl.pathname.startsWith('/')) {
        ejs.renderFile('./views/home.ejs', (error, content) => {
          return response.end(content);
        });
        //return response.end('<p>HTML sample test</p>');
      } else {
        return response.writeHead('404').end('Page Not Found');
      }
    }
  }
}
