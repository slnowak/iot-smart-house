/**
 * Created by novy on 27.04.15.
 */

var _ = require("lodash");
var assign = require("object-assign");
var AppDispatcher = require('../common/AppDispatcher');
var EventEmitter = require("events").EventEmitter;
var TemperatureActionTypes = require("./Constants").ActionTypes;

var _rooms = {};

var CHANGE_EVENT = "changed";

var fromListOfObjectsToObject = function (listOfObjects) {
  var withSensorListTransformedToObject = listOfObjects.map(function (room) {
    var roomCopy = _.merge({}, room);
    roomCopy.sensors = _.indexBy(room.sensors, 'name');
    return roomCopy;
  });

  return _.indexBy(withSensorListTransformedToObject, 'roomName');
};

var fromObjectToListOfObjects = function (object) {
  return _.values(object).map(function (roomWithSensorsAsObject) {
    var roomCopy = _.merge({}, roomWithSensorsAsObject);
    roomCopy.sensors = _.values(roomWithSensorsAsObject.sensors);
    return roomCopy;
  });
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

  newestTemperatureData: function () {
    return fromObjectToListOfObjects(_rooms);
  }

});

TemperatureStore.dispatchToken = AppDispatcher.register(function (action) {

  switch (action.type) {
    case TemperatureActionTypes.UPDATE_ALL_DATA:
      _rooms = fromListOfObjectsToObject(action.payload);
      TemperatureStore.emitChange();
      break;

    case TemperatureActionTypes.UPDATE_TEMPERATURE:
      var temperatureChange = action.payload;
      _rooms[temperatureChange.roomName].currentTemperature = temperatureChange.temperature;
      TemperatureStore.emitChange();
      break;

    case TemperatureActionTypes.UPDATE_DESIRED_TEMPERATURE:
      var desiredTemperatureChange = action.payload;
      _rooms[desiredTemperatureChange.roomName].desiredTemperature = desiredTemperatureChange.temperature;
      TemperatureStore.emitChange();
      break;

    case TemperatureActionTypes.UPDATE_SYSTEM_SENSOR:
      var systemSensorChange = action.payload;
      _rooms[systemSensorChange.roomName].sensors[systemSensorChange.sensor.name].state = systemSensorChange.sensor.state;
      TemperatureStore.emitChange();
      break;

    default:
  }

});

module.exports = TemperatureStore;
