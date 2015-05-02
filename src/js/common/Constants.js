/**
 * Created by novy on 30.04.15.
 */

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    UPDATE_URL_CONFIGURATION: null
  }),

  Routes: {
    ROOT: '/',
    LIGHTS: '/lights',
    TEMPERATURE: '/temperature',
    CONFIGURATION: '/configuration'
  }
};
