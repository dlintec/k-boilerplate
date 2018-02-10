/**
 * Fetch the config at the start of the program
 */
orion.config.object = Injected.obj('orion.config');

orion.config.getCategories = function() {
  console.log("config object:",orion.config.object,orion.config.collection,Roles.userHasRole( Meteor.userId(), "admin2" ));
  return _.uniq(_.pluck(orion.config.collection.simpleSchema()._schema, 'category'));
};
