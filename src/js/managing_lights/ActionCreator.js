/**
 * Created by novy on 23.04.15.
 */

var AppDispatcher = require('../common/AppDispatcher');
var LightActionTypes = require('./Constants').ActionTypes;

// todo: call server via websocket
// todo: register webscoket callback to update store

var lightStateActionCreator = {

  switchLight: function (room, state) {

    AppDispatcher.dispatch({
      type: LightActionTypes.CHANGE_LIGHT_STATE,
      payload: {
        room: room,
        state: state
      }
    });
  }

};

module.exports = lightStateActionCreator;
