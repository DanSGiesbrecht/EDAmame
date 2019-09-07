/*************************************************************
* digikey.js
*************************************************************/

const request = require('request');
const config = require('./config.js');
const helper = require('./helper.js');

module.exports = {

  getCode: (request) => {
    const oauthRedirect = helper.queryData(request.url);
    if('error' in oauthRedirect) {
      console.log(oauthRedirect.error);
      return null;
    } else if('code' in oauthRedirect) {
      return oauthRedirect.code;
    } else {
      console.log('Did not receive code or error');
      return null;
    }
  },

  requestTokens: (code) => {
    return new Promise((resolve, reject) => {
      request.post({url: 'https://sso.digikey.com/as/token.oauth2', form: {
        code: code,
        client_id: config.digikey.client_id,
        client_secret: config.digikey.secret,
        redirect_uri: 'https://localhost:3000/oauth/redirect',
        grant_type: 'authorization_code'
      }}, (error, res, body) => {
        if(error) {
	  reject('Failed to get access token');
        } else {
	  resolve(body);
        }
      });
    });
  }
};
