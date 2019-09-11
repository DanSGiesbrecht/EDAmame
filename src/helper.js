/*************************************************************
* helper.js
*************************************************************/
const url = require('url');

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
  }
};
