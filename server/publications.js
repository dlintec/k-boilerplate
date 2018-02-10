Meteor.publish('sectionsPub', function(){
  return Sections.find();
});
Meteor.publish('beersPub', function(){
  return Beers.find();
});
Meteor.publish( 'user', function() {
  return Meteor.users.find( this.userId, {
    fields: {
      "services.facebook.email": 1,
      "services.github.email": 1,
      "services.google.email": 1,
      "services.twitter.screenName": 1,
      "emails": 1,
      "profile": 1
    }
  });
});
Meteor.publish('dioramasPub', function(){
  return Dioramas.find();
});
