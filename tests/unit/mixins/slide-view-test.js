import Ember from 'ember';
import SlideViewMixin from 'ember-cli-slide-animation/mixins/slide-view';

module('SlideViewMixin');

// Replace this with your real tests.
test('it works', function() {
  var SlideViewObject = Ember.Object.extend(SlideViewMixin);
  var subject = SlideViewObject.create();
  ok(subject);
});
