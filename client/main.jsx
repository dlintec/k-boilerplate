console.log('Starting client...');
import React from 'react';
import {mount} from 'react-mounter';
import reactApp from '/imports/ui/components/reactApp.jsx';

getUserLanguage = function () {
  // Put here the logic for determining the user language
  var userLang = navigator.language || navigator.userLanguage;
  console.log(`User language: ${userLang}`);
  userLang = userLang.split('-')[0];
  Session.set('lang', userLang);
  return userLang;
};

Meteor.startup(() => {
console.log(`TAPi18n languages`,TAPi18n.getLanguages());

//mount(reactApp , {name: 'k-react-app'});
//render(<reactApp />, document.getElementById('render-target'));
  //ReactDOM.render(<reactApp />,  document.getElementById('render-target'));
  if (Meteor.isClient) {
      Bert.defaults = {
        hideDelay: 10000,
        // Accepts: a number in milliseconds.
        style: 'fixed-bottom',
        // Accepts: fixed-top, fixed-bottom, growl-top-left,   growl-top-right,
        // growl-bottom-left, growl-bottom-right.
        type: 'default'
        // Accepts: default, success, info, warning, danger.
      };
      console.log('Startup client i18n');
      Session.set("showLoadingIndicator", true);

      TAPi18n.setLanguage(getUserLanguage())
        .done(function () {
          Session.set("showLoadingIndicator", false);
        })
        .fail(function (error_message) {
          // Handle the situation
          console.log(error_message);
        });

      //console.log('i18n extend datatable');
      $.extend(true, $.fn.dataTable.defaults, {
        language: {
          "search": i18n("tabular.search")+":",
          "lengthMenu": i18n("tabular.lengthMenu"),
          "zeroRecords": i18n("tabular.infoEmpty"),
          "info": i18n("tabular.info"),
          "infoEmpty": i18n("tabular.emptyTable"),
          "paginate": {
            "first": i18n("tabular.paginate.first"),
            "previous": i18n("tabular.paginate.previous"),
            "next": i18n("tabular.paginate.next"),
            "last": i18n("tabular.paginate.last"),
          }
        }
      });

  }

});
