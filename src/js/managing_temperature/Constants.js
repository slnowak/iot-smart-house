/**
 * Created by novy on 27.04.15.
 */

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    UPDATE_ALL_DATA: null,
    UPDATE_TEMPERATURE: null,
    UPDATE_DESIRED_TEMPERATURE: null,
    UPDATE_SYSTEM_SENSOR: null
  }),

  Messages: {
    ALL_TEMPERATURES: 'temperatures',
    TEMPERATURE_CHANGED: 'temperature_changed',
    SYSTEM_SENSOR_CHANGED: 'sensor_changed',
    DESIRED_TEMPERATURE_CHANGED: 'desired_temperature_changed'
  }
};
