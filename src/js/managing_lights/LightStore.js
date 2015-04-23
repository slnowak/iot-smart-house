/**
 * Created by novy on 23.04.15.
 */

var _ = require("lodash");
var assign = require("object-assign");
var AppDispatcher = require('../common/AppDispatcher');
var EventEmitter = require("events").EventEmitter;
var LightActionTypes = require("./Constants").ActionTypes;

var _lights = {
  Kitchen: {
    name: 'Kitchen',
    state: 'off'
  },

  Bedroom: {
    name: 'Bedroom',
    state: 'off'
  },

  Laundry: {
    name: 'Laundry',
    state: 'off'
  }
};

var CHANGE_EVENT = "changed";

var LightStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  newestLightConfiguration: function () {
    return _.values(_lights);
  }

});

LightStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.type) {
    case LightActionTypes.CHANGE_LIGHT_STATE:
      var payload = action.payload;
      _lights[payload.room].state = payload.state;
      LightStore.emitChange();
      break;

    default:
  }

});

module.exports = LightStore;
