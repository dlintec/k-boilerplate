Template.section.helpers({
  background: function(){
    if(this.backgroundImage){
      return "background-image: url(" + gridfsURL(this.backgroundImage.url) + ")";
    }
    return "background-color: " + this.backgroundColour ||
      orion.dictionary.get('site.defaultColour', '#ffffff');
  },
  hasBackgroundImage: function(){
    return !!this.backgroundImage;
  }
});
Template.section.events({

  'click .scroll-home': function(){
    console.log(`home from section`);

    Session.set('scrolling', true);
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  },

});
