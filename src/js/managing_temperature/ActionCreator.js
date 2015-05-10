/**
 * Created by novy on 27.04.15.
 */

var WebSocketFactory = require('../common/WebSocketFactory');
var SocketListener = require('./SocketListener');
var Messages = require('./Constants').Messages;

var _socket;

var temperatureActionCreator = {

  init: function () {
    _socket = WebSocketFactory.temperatureWebSocket();
    SocketListener.listen(_socket);
  },

  changeDesiredTemperature: function (roomName, desiredTemperature) {
    _socket.emit(Messages.DESIRED_TEMPERATURE_CHANGED, {
      roomName: roomName,
      temperature: desiredTemperature
    });
  }

};

module.exports = temperatureActionCreator;

