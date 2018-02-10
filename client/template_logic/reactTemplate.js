import reactApp from '/imports/ui/components/reactApp.jsx';

import { Template } from 'meteor/templating';




Template.reactTemplate.helpers({
  reactApp() {
    return reactApp;
  }
})
