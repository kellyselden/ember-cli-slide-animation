#ember-cli-slide-animation

Route transition slide animation. Aiming to imitate the slide left and slide right transitions of iOS and mobile in general. This uses the [ember-animate](https://github.com/gigafied/ember-animate) library.

##Live Demo

[Live demo](http://ember-cli-slide-animation.herokuapp.com/) with [source code](https://github.com/kellyselden/ember-cli-slide-animation-demo)

##Usage

`ember install:addon ember-cli-slide-animation`
```javascript
import SlideViewMixin from 'ember-cli-slide-animation/mixins/slide-view';

export default Ember.View.extend(SlideViewMixin);
```

Though views are not very common in Ember.js, to get the slide animation on your transitions, you must create a view for every route you want animated. Then include the mixin and you're all set. Your route heirarchy will determine the slide direction.
