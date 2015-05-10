/**
 * Created by novy on 27.04.15.
 */

var io = require('socket.io-client');
var AppDispatcher = require('../common/AppDispatcher');
var TemperatureActionTypes = require('./Constants').ActionTypes;
var Messages = require('./Constants').Messages;

var listen = function (socket) {
  socket
    .on(Messages.DESIRED_TEMPERATURES, function (allTemperaturesData) {

      AppDispatcher.dispatch({
        type: TemperatureActionTypes.UPDATE_ALL_DATA,
        payload: allTemperaturesData
      });

    })

};

module.exports = {
  listen: listen
};
