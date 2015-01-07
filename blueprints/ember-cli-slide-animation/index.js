module.exports = {
  description: 'adds ember-animate bower package',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('ember-animate');
  }
};
