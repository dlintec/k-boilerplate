import React from 'react';




Template.flow_layout.onCreated(function() {
  this.autorun(() => {
    FlowRouter.watchPathChange();
    document.title = orion.dictionary.get('site.title', 'dlintec app');
  });
});
