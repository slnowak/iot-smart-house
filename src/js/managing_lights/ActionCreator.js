/**
 * Created by novy on 23.04.15.
 */

var socket = require('./SocketListener');
var Messages = require('./Constants').Messages;

var lightStateActionCreator = {

  switchLight: function (roomName, state) {
    socket.emit(Messages.SWITCH_LIGHT, {
      name: roomName,
      state: state
    });
  }

};

module.exports = lightStateActionCreator;
