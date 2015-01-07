import Ember from 'ember';

export function initialize() {
  Ember.ContainerView.reopen({ animationSequence: 'async' });
}

export default {
  name: 'reopen-async',
  initialize: initialize
};
