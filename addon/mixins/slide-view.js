import Ember from 'ember';

function getCount(path) {
  return path.split('/').filter(function(s) { return s.length; }).length;
}

function getApp() {
  return this.container.lookup('application:main');
}

function setAnimateOutContext(animateOutContext) {
  getApp.call(this).set('animateOutContext', animateOutContext);
}
function getAnimateOutContext() {
  return getApp.call(this).get('animateOutContext');
}

function updatePreviousPath() {
  getApp.call(this).set('previousPath', window.location.pathname);
}
function getPreviousPath() {
  return getApp.call(this).get('previousPath');
}

var isReversed;
function updateIsReversed() {
  var previousPath = getPreviousPath.call(this);
  var currentPath = window.location.pathname;
  isReversed = previousPath && getCount(previousPath) > getCount(currentPath);
}

export default Ember.Mixin.create({
  willAnimateOut: function() {
  },
  animateOut: function(done) {
    if (!this.get('animate')) {
      done();
      return;
    }

    setAnimateOutContext.call(this, {
      view: this,
      done: done
    });
  },
  willAnimateIn: function() {
    var animateOutContext = getAnimateOutContext.call(this);
    if (!animateOutContext) return;
    updateIsReversed.call(this);

    var el = this.$();
    var translate = Ember.$(window).width() - el.offset().left;
    el.css('transform', 'translateX(' + (translate * (isReversed ? -1 : 1)) + 'px)');

    el = animateOutContext.view.$();
    var container = el.closest('.container');
    el.one('transitionend', function() {
      container.removeAttr('style');
      el.removeClass('slideOut');
      el.removeAttr('style');
      animateOutContext.done();
    });
    container.css('position', 'relative');
    el.addClass('slideOut');
    translate = el.offset().left + el.outerWidth();
    el.css('transform', 'translateX(' + (translate * (isReversed ? 1 : -1)) + 'px)');
  },
  animateIn: function(done) {
    // on page refresh, don't animate
    if (!getAnimateOutContext.call(this)) {
      done();
      return;
    }

    var el = this.$();
    el.removeAttr('style');
    el.one('transitionend', function() {
      el.removeClass('slideIn');
      done();
    });
    el.addClass('slideIn');
  },
  didAnimateOut: function() {
    setAnimateOutContext.call(this, undefined);
  },
  didAnimateIn: function() {
    updatePreviousPath.call(this);
  },

  isAnimated: true,
  actions: {
    newView: function(newView) {
      this.set('animate', newView.isAnimated);
    }
  }
});
