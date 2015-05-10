/**
 * Created by novy on 27.04.15.
 */

var io = require('socket.io-client');
var AppDispatcher = require('../common/AppDispatcher');
var ActionTypes = require('./Constants').ActionTypes;
var Messages = require('./Constants').Messages;

var listen = function (socket) {
  socket
    .on(Messages.DESIRED_TEMPERATURES, function (allTemperaturesData) {

      AppDispatcher.dispatch({
        type: ActionTypes.UPDATE_ALL_DATA,
        payload: allTemperaturesData
      });

    })
    .on(Messages.SENSORS_STATE, function (sensorData) {

      var currentGlobalTemperature = sensorData['currentTemp'];
      var sensors = sensorData['sensors'];

      AppDispatcher.dispatch({
        type: ActionTypes.UPDATE_CURRENT_GLOBAL_TEMPERATURE,
        payload: currentGlobalTemperature
      });

      AppDispatcher.dispatch({
        type: ActionTypes.UPDATE_SENSORS,
        payload: sensors
      });

    });

};

module.exports = {
  listen: listen
};
