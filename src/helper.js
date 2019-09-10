/*************************************************************
* helper.js
*************************************************************/
const url = require('url');

module.exports = {
  onPath: (path, urlObj) => {
    const reqUrl = url.parse(urlObj, true);
    return reqUrl.pathname.startsWith(path);
  },

  queryData: (urlObj) => {
    return url.parse(urlObj, true).query;
  }
};
