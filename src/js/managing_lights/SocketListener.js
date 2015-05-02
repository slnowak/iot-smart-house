/**
 * Created by novy on 24.04.15.
 */

var io = require('socket.io-client');
var AppDispatcher = require('../common/AppDispatcher');
var LightActionTypes = require('./Constants').ActionTypes;
var Messages = require('./Constants').Messages;

var listen = function (socket) {
  socket
    .on(Messages.LIGHTS_CHANGED, function (newConfiguration) {

      AppDispatcher.dispatch({
        type: LightActionTypes.SUBSTITUTE_LIGHT_CONFIGURATION,
        payload: newConfiguration
      });

    })
    .on(Messages.LIGHT_CHANGED, function (room) {

      AppDispatcher.dispatch({
        type: LightActionTypes.CHANGE_LIGHT_STATE,
        payload: room
      });

    });
};

module.exports = {
  listen: listen
};
