/**
 * Created by novy on 30.04.15.
 */

var io = require('socket.io-client');
var ConfigurationStore = require('./ConfigurationStore');

// https://github.com/Automattic/socket.io-client/issues/255
var connectionsParams = {'force new connection': true};

var WebSocketFactory = {

  lightsWebSocket: function () {
      return io.connect(
      ConfigurationStore.lightsSocketEndpoint(), connectionsParams
    )
  },

  temperatureWebSocket: function () {
    return io.connect(
      ConfigurationStore.temperatureSocketEndpoint(), connectionsParams
    )
  }
};

module.exports = WebSocketFactory;
