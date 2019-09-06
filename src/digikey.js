/*************************************************************
* digikey.js
*************************************************************/

//const request = require('request');
const config = require('./config.js');
const helper = require('./helper.js');

module.exports = {

  getCode: (request) => {
    const oauthRedirect = helper.queryData(request.url);
    if('error' in oauthRedirect) {
      console.log(oauthRedirect.error);
      return oauthRedirect.error;
    } else if('code' in oauthRedirect) {
      console.log('code: ' + oauthRedirect.code);
      return oauthRedirect.code;
    } else {
      console.log('Did not receive code or error');
      return 'no_code_or_error';
    }
  }
};
