/**
 * Created by novy on 27.04.15.
 */

var io = require('socket.io-client');
var AppDispatcher = require('../common/AppDispatcher');
var TemperatureActionTypes = require('./Constants').ActionTypes;
var Messages = require('./Constants').Messages;

var listen = function (socket) {
  socket
    .on(Messages.ALL_TEMPERATURES, function (allTemperaturesData) {

      AppDispatcher.dispatch({
        type: TemperatureActionTypes.UPDATE_ALL_DATA,
        payload: allTemperaturesData
      });

    })
    .on(Messages.TEMPERATURE_CHANGED, function (temperatureChange) {

      AppDispatcher.dispatch({
        type: TemperatureActionTypes.UPDATE_TEMPERATURE,
        payload: temperatureChange
      });

    })
    .on(Messages.SYSTEM_SENSOR_CHANGED, function (systemSensorChange) {

      AppDispatcher.dispatch({
        type: TemperatureActionTypes.UPDATE_SYSTEM_SENSOR,
        payload: systemSensorChange
      });

    });
};

module.exports = {
  listen: listen
};
