/**
 * Created by novy on 30.04.15.
 */

var AppDispatcher = require('../common/AppDispatcher');
var ActionTypes = require('./../common/Constants').ActionTypes;
var cookie = require('react-cookie');

var cookieConfiguration = {
  maxAge: 120
};

var saveRemoteUrl = function (remoteUrl) {

  AppDispatcher.dispatch({
    type: ActionTypes.UPDATE_URL_CONFIGURATION,
    url: remoteUrl
  });

  cookie.save('url', remoteUrl, cookieConfiguration);

};

module.exports = {
  saveRemoteUrl: saveRemoteUrl
};
