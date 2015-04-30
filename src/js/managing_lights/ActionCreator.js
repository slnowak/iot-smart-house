/**
 * Created by novy on 23.04.15.
 */

var WebSocketFactory = require('../common/WebSocketFactory');
var SocketListener = require('./SocketListener');
var Messages = require('./Constants').Messages;

var _socket;

var lightStateActionCreator = {

  init: function () {
    _socket = WebSocketFactory.lightsWebSocket();
    SocketListener.listen(_socket);
  },

  switchLight: function (roomName, state) {
    _socket.emit(Messages.SWITCH_LIGHT, {
      name: roomName,
      state: state
    });
  }

};

module.exports = lightStateActionCreator;
