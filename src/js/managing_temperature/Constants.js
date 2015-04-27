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

  Messages: {}
};
