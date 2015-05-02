/**
 * Created by novy on 27.04.15.
 */

var WebSocketFactory = require('../common/WebSocketFactory');
var SocketListener = require('./SocketListener');
var TemperatureActionTypes = require('./Constants').ActionTypes;
var Messages = require('./Constants').Messages;
var AppDispatcher = require('../common/AppDispatcher');

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

    AppDispatcher.dispatch({
      type: TemperatureActionTypes.UPDATE_DESIRED_TEMPERATURE,
      payload: {
        roomName: roomName,
        temperature: desiredTemperature
      }
    });
  }

};

module.exports = temperatureActionCreator;

