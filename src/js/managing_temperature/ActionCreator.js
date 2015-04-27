/**
 * Created by novy on 27.04.15.
 */

var socket = require('./SocketListener');
var TemperatureActionTypes = require('./Constants').ActionTypes;
var Messages = require('./Constants').Messages;
var AppDispatcher = require('../common/AppDispatcher');

var temperatureActionCreator = {

  changeDesiredTemperature: function (roomName, desiredTemperature) {
    socket.emit(Messages.DESIRED_TEMPERATURE_CHANGED, {
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

