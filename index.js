/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-slide-animation',

  included: function(app) {
    app.import(app.bowerDirectory + '/ember-animate/ember-animate.js');
  }
};
