import Ember from 'ember';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  Ember.ContainerView.reopen({ animationSequence: 'async' });
}

export default {
  name: 'reopen-async',
  initialize: initialize
};
