/**
 * Created by novy on 01.05.15.
 */

var ConfigurationStore = require('./ConfigurationStore');

var AuthenticationMixin = {

  statics: {
    willTransitionTo: function (transition) {
      var nextPath = transition.path;
      if (!ConfigurationStore.hasConfiguration()) {

        transition.redirect('/configuration', {}, {
          nextPath: nextPath
        })
      }
    }
  }

};

module.exports = AuthenticationMixin;
