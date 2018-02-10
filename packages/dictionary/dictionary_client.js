var subscription = Meteor.subscribe('orion_dictionary');

/**
 * Access the dictionary on any template
 */
Template.registerHelper('dict', function(name, defaultValue) {
  var dict_value=orion.dictionary.get(name, defaultValue);
  var new_value=_.clone(dict_value);

  //var urlParams=parse_url(Meteor.absoluteUrl(dict_value.url));
  //var abs_url=urlParams.scheme+'://'+urlParams.authority+dict_value.url
  //console.log('dict helper:',dict_value);
  //  new_value.url=abs_url;

  return new_value;
});

/**
 * Is the dictionary subscription ready
 */
orion.dictionary.isReady = function() {
  return subscription.ready();
}

/**
 * Is the dictionary subscription ready for templates
 */
Template.registerHelper('dictionaryReady', function() {
  return subscription.ready();
});

orion.dictionary.availableCategories = function() {
  return _.union.apply(this, Roles.helper(Meteor.userId(), 'dictionary.allowedCategories'));
};
