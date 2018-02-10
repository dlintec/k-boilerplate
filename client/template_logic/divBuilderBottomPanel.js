Template.divBuilderBottomPanel.helpers({

});
Template.divBuilderBottomPanel.events({

});
Template.divBuilderBottomPanel.rendered = function() {
    //console.log('divBuilderBottomPanel rendered:',$('#divBuilderBottomPanel'));
    if (! self.inited){

      //console.log('divBuilderBottomPanel inited');

      $('#divBuilderBottomPanel').on('shown.bs.collapse', function() {
          // do something
          $('#divBuilderBottomPanel').css('display','block');
          //console.log('divBuilderBottomPanel collapse event');
      });
      self.inited=true;
    }

}

Template.divBuilderBottomPanel.onCreated(function() {
    const self = this;
    self.inited=false;
});
