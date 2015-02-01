#ember-cli-slide-animation

Route transition slide animation. Aiming to imitate the slide left and slide right transitions of iOS and mobile in general. This uses the [ember-animate](https://github.com/gigafied/ember-animate) library.

##Usage

`npm install --save-dev ember-cli-slide-animation`
```javascript
import SlideViewMixin from 'ember-cli-slide-animation/mixins/slide-view';

export default Ember.View.extend(SlideViewMixin);
```

Though views are not very common in Ember.js, to get the slide animation on your transitions, you must create a view for every route you want animated. Then include the mixin and you're all set. Your route heirarchy will determine the slide direction.
