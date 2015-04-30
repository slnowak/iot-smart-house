/**
 * Created by novy on 30.04.15.
 */

var io = require('socket.io-client');
var ConfigurationStore = require('./ConfigurationStore');

var WebSocketFactory = {

  lightsWebSocket: function () {
    console.log('light url ' +     ConfigurationStore.lightsSocketEndpoint()
    );
    return io.connect(
      ConfigurationStore.lightsSocketEndpoint()
    )
  },

  temperatureWebSocket: function () {
    return io.connect(
      ConfigurationStore.temperatureSocketEndpoint()
    )
  }
};

module.exports = WebSocketFactory;
