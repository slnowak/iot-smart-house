/**
 * Created by novy on 23.04.15.
 */

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    INIT: null,
    CHANGE_LIGHT_STATE: null,
    SUBSTITUTE_LIGHT_CONFIGURATION: null
  }),

  Messages: {
    LIGHTS_CHANGED: 'lights_changed',
    LIGHT_CHANGED: 'light_changed',
    SWITCH_LIGHT: 'switch_light'
  }
};
