/**
 * Created by novy on 30.04.15.
 */

var AppDispatcher = require('../common/AppDispatcher');
var ActionTypes = require('./../common/Constants').ActionTypes;

var saveRemoteUrl = function (remoteUrl) {

  AppDispatcher.dispatch({
    type: ActionTypes.UPDATE_URL_CONFIGURATION,
    url: remoteUrl
  });

};

module.exports = {
  saveRemoteUrl: saveRemoteUrl
};
