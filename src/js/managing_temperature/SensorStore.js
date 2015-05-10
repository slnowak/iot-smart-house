/**
 * Created by novy on 10.05.15.
 */

var _ = require("lodash");
var assign = require("object-assign");
var AppDispatcher = require('../common/AppDispatcher');
var EventEmitter = require("events").EventEmitter;
var ActionTypes = require("./Constants").ActionTypes;

var _sensors = {};

var CHANGE_EVENT = "changed";

var fromListOfObjectsToObject = function (listOfObjects) {
  return _.indexBy(listOfObjects, 'name');
};

var fromObjectToListOfObjects = function (object) {
  return _.values(object);
};


var SensorStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  sensorState: function () {
    return fromObjectToListOfObjects(_sensors);
  }

});

SensorStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.type) {
    case ActionTypes.UPDATE_SENSORS:
      _sensors = fromListOfObjectsToObject(action.payload);
      SensorStore.emitChange();
      break;

    default:
  }

});

module.exports = SensorStore;
