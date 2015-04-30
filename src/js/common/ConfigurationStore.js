/**
 * Created by novy on 30.04.15.
 */

var AppDispatcher = require('./AppDispatcher');
var ActionTypes = require('./Constants').ActionTypes;
var cookie = require('react-cookie');

var _lightsUrl = '';
var _temperatureUrl = '';

var determineUrlsFrom = function(baseUrl) {
  _lightsUrl = baseUrl + ':9090';
  _temperatureUrl = baseUrl + ':9091';
};

determineUrlsFrom(cookie.load('url'));

var ConfigurationStore = {
  lightsSocketEndpoint: function () {
    return _lightsUrl;
  },

  temperatureSocketEndpoint: function () {
    return _temperatureUrl;
  }

};

ConfigurationStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.type) {

    case ActionTypes.UPDATE_URL_CONFIGURATION:
      determineUrlsFrom(action.url);
      break;

    default:
  }

});

module.exports = ConfigurationStore;
