module.exports = {
  description: 'adds ember-animate bower package',

  afterInstall: function() {
    return this.addBowerPackageToProject('ember-animate');
  }
};
