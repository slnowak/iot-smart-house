/**
 * Created by novy on 27.04.15.
 */

var _ = require("lodash");
var assign = require("object-assign");
var AppDispatcher = require('../common/AppDispatcher');
var EventEmitter = require("events").EventEmitter;
var TemperatureActionTypes = require("./Constants").ActionTypes;

var _rooms = {};
var _current_global_temperature;

var CHANGE_EVENT = "changed";

var fromListOfObjectsToObject = function (listOfObjects) {
  return _.indexBy(listOfObjects, 'roomName');
};

var fromObjectToListOfObjects = function (object) {
  return _.values(object);
};


var TemperatureStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  desiredTemperature: function () {
    return fromObjectToListOfObjects(_rooms);
  },

  currentGlobalTemperature: function () {
    return _current_global_temperature;
  }

});

TemperatureStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.type) {
    case TemperatureActionTypes.UPDATE_ALL_DATA:
      _rooms = fromListOfObjectsToObject(action.payload);
      TemperatureStore.emitChange();
      break;

    case TemperatureActionTypes.UPDATE_DESIRED_TEMPERATURE:
      var desiredTemperatureChange = action.payload;
      _rooms[desiredTemperatureChange.roomName].temperature = desiredTemperatureChange.temperature;
      TemperatureStore.emitChange();
      break;

    case TemperatureActionTypes.UPDATE_CURRENT_GLOBAL_TEMPERATURE:
      var currentGlobalTemperature = action.payload;
      _current_global_temperature = currentGlobalTemperature;
      TemperatureStore.emitChange();
      break;

    default:
  }

});

module.exports = TemperatureStore;
