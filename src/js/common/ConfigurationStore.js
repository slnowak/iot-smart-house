/**
 * Created by novy on 30.04.15.
 */

var AppDispatcher = require('./AppDispatcher');
var ActionTypes = require('./Constants').ActionTypes;
var cookie = require('react-cookie');

var URL_KEY = 'url';


var _lightsUrl = '';
var _temperatureUrl = '';

var determineUrlsFrom = function(baseUrl) {
  _lightsUrl = baseUrl + ':5000' + '/lights';
  _temperatureUrl = baseUrl + ':5000' + '/temperature';
};

determineUrlsFrom(cookie.load(URL_KEY));

var cookieConfiguration = {
  maxAge: 120
};

var ConfigurationStore = {
  lightsSocketEndpoint: function () {
    return _lightsUrl;
  },

  temperatureSocketEndpoint: function () {
    return _temperatureUrl;
  },

  hasConfiguration: function() {
    return cookie.load(URL_KEY);
  }

};

ConfigurationStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.type) {

    case ActionTypes.UPDATE_URL_CONFIGURATION:
      var newRemoteUrl = action.url;
      determineUrlsFrom(newRemoteUrl);
      cookie.save(URL_KEY, newRemoteUrl, cookieConfiguration);
      break;

    default:
  }

});

module.exports = ConfigurationStore;
