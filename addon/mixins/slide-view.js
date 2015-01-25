import Ember from 'ember';

function getCount(path) {
  return path.split('/').filter(function(s) { return s.length; }).length;
}

function setAnimateOutContext(animateOutContext) {
  this.container.lookup('application:main').set('animateOutContext', animateOutContext);
}
function getAnimateOutContext() {
  return this.container.lookup('application:main').get('animateOutContext');
}

function updatePreviousPath() {
  this.container.lookup('application:main').set('previousPath', window.location.pathname);
}
function getPreviousPath() {
  return this.container.lookup('application:main').get('previousPath');
}

var isReversed, isSame;
function updateIsReversed() {
  var previousPath = getPreviousPath.call(this);
  var currentPath = window.location.pathname;
  isReversed = previousPath && getCount(previousPath) > getCount(currentPath);
  isSame = previousPath && getCount(previousPath) === getCount(currentPath);
}

export default Ember.Mixin.create({
  willAnimateOut: function() {
  },
  animateOut: function(done) {
    setAnimateOutContext.call(this, {
      view: this,
      done: done
    });
  },
  willAnimateIn: function() {
    var animateOutContext = getAnimateOutContext.call(this);
    if (!animateOutContext) return;
    updateIsReversed.call(this);
    if (isSame) {
      animateOutContext.done();
      return;
    }

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
    if (!getAnimateOutContext.call(this) || isSame) {
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
  }
});
