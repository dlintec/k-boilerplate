
Template.header.events({
  'click .scroll-link': function(e){
      scrollToSection(e);
  },
  'click .logout': function(event){
		event.preventDefault();
		AccountsTemplates.logout();
	},
  'click .scroll-home': function(){

    Session.set('scrolling', true);
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  },

});
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});

Template.header.onCreated(function() {
  const pagesHandle=this.subscribe('pages');

  const sectionsHandle=this.subscribe( 'sectionsPub');
  this.autorun(() => {
    FlowRouter.watchPathChange();
    const pagesIsReady = pagesHandle.ready();
    const sectionsIsReady = sectionsHandle.ready();
    //console.log(`Header Pages Handle is ${pagesIsReady ? 'ready' : 'not ready'}`);
    //console.log(`Header Sections Handle is ${sectionsIsReady ? 'ready' : 'not ready'}`);


    //document.title = orion.dictionary.get('site.title', 'dlintec');
  });
});

Template.header.helpers({
  sections: function(){
      return Sections.find({}, {sort: {order: 1}});
  },
  pagesHelper:function(){
    console.log(`pagesHelper`);
    return  pages.find({}, {sort: {order: 1}});
  },
});
