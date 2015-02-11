import Ember from 'ember';

export function initialize() {
  Ember.ContainerView.reopen({
    animationSequence: 'async',

    currentViewObserver: function() {
      this.get('activeView').send('newView', this.get('newView'));
    }.observes('newView')
  });
}

export default {
  name: 'reopen-async',
  initialize: initialize
};
