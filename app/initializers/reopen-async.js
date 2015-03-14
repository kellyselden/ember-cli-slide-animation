import Ember from 'ember';

export function initialize() {
  Ember.ContainerView.reopen({
    animationSequence: 'async',

    currentViewObserver: function() {
      var activeView = this.get('activeView');
      if (activeView) {
        activeView.send('newView', this.get('newView'));
      }
    }.observes('newView')
  });
}

export default {
  name: 'reopen-async',
  initialize: initialize
};
