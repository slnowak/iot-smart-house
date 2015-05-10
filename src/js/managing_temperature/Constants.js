/**
 * Created by novy on 27.04.15.
 */

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    INIT: null,
    UPDATE_ALL_DATA: null,
    UPDATE_DESIRED_TEMPERATURE: null,
    UPDATE_CURRENT_GLOBAL_TEMPERATURE: null
  }),

  Messages: {
    DESIRED_TEMPERATURES: 'desired_temperatures',
    DESIRED_TEMPERATURE_CHANGED: 'desired_temperature_changed'
  }
};
