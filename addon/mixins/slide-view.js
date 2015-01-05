import Ember from 'ember';

function getCount(path) {
  return path.split('/').filter(function(s) { return s.length; }).length;
}

var isReversed;

function updateIsReversed() {
  var previousPath = this.container.lookup('application:main').get('previousPath');
  var currentPath = window.location.pathname;
  isReversed = previousPath && getCount(previousPath) > getCount(currentPath);
}

export default Ember.Mixin.create({
  willAnimateOut: function() {
    console.log('willAnimateOut: ' + window.history.state.path);
    updateIsReversed.call(this);
  },
  animateOut: function(done) {
    console.log('animateOut: ' + window.history.state.path);
    var el = this.$();
    var container = el.closest('.container');
    el.one('transitionend', function() {
      container.removeAttr('style');
      el.removeClass('slideOut');
      el.removeAttr('style');
      done();
    });
    container.css('position', 'relative');
    el.addClass('slideOut');
    var translate = el.offset().left + el.outerWidth();
    el.css('transform', 'translateX(' + translate + 'px)');
    this.container.lookup('application:main').set('animateOutContext', {
      view: this,
      translate: translate
    });
  },
  willAnimateIn: function() {
    console.log('willAnimateIn: ' + window.history.state.path);
    updateIsReversed.call(this);
    var el = this.$();
    var translate = Ember.$(window).width() - el.offset().left;
    el.css('transform', 'translateX(' + (translate * (isReversed ? -1 : 1)) + 'px)');
    var animateOutContext = this.container.lookup('application:main').get('animateOutContext');
    if (animateOutContext) {
      el = animateOutContext.view.$();
      translate = animateOutContext.translate;
      el.css('transform', 'translateX(' + (translate * (isReversed ? 1 : -1)) + 'px)');
    }
  },
  animateIn: function(done) {
    console.log('animateIn: ' + window.history.state.path);
    var el = this.$();
    el.removeAttr('style');
    el.one('transitionend', function() {
      el.removeClass('slideIn');
      done();
    });
    el.addClass('slideIn');
  },
  didAnimateOut: function() {
    console.log('didAnimateOut: ' + window.history.state.path);
    this.container.lookup('application:main').set('animateOutContext', undefined);
  },
  didAnimateIn: function() {
    console.log('didAnimateIn: ' + window.history.state.path);
    this.container.lookup('application:main').set('previousPath', window.location.pathname);
  }
});
