import React, { Component, PropTypes  } from 'react';
import {mount} from 'react-mounter';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import reactApp from '/imports/ui/components/reactApp.jsx';
// load Layout and Welcome React components

main_route={
  action: function(params) {
    BlazeLayout.render("flow_layout",  { top:"header",main: "mainPage" })
  }
}
//FlowRouter.route('/1', main_route);
FlowRouter.route('/', main_route);

class MainLayoutCtx extends React.Component {
   render(){
    const {content} = this.props //destructuring obj
    return (
     <div>
      {content}
     </div>
    )
  }
}
FlowRouter.route("/react2", {
  action() {
    console.log("react2",MainLayoutCtx);

    mount( MainLayoutCtx, {content: <reactApp/>});
    //BlazeLayout.render("flow_layout",  { top:"header" })
    //ReactDOM.render( <beerApp />, document.getElementById('render-target') );
  }
});
FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go( '/' );
        Bert.alert( 'Email verified! Thanks!', 'success' );
      }
    });
  }
});
