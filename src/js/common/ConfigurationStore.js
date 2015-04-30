/**
 * Created by novy on 30.04.15.
 */

var AppDispatcher = require('./AppDispatcher');
var ActionTypes = require('./Constants').ActionTypes;

var _lightsUrl;
var _temperatureUrl;

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
      var baseRemoteUrl = action.url;
      _lightsUrl = baseRemoteUrl + ':9090';
      _temperatureUrl = baseRemoteUrl + ':9091';
      break;

    default:
  }

});

module.exports = ConfigurationStore;
