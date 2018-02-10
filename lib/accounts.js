AccountsTemplates.configure({
    defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
    defaultLayout: 'flow_layout',
    defaultContentRegion: 'main',

    // Behavior
     confirmPassword: true,
     enablePasswordChange: true,
     forbidClientAccountCreation: false,
     overrideLoginErrors: true,
     sendVerificationEmail: false,
     lowercaseUsername: false,
     focusFirstInput: true,

     // Appearance
     showAddRemoveServices: true,
     showForgotPasswordLink: true,
     showLabels: true,
     showPlaceholders: true,
     showResendVerificationEmailLink: true,

     // Client-side Validation
     continuousValidation: false,
     negativeFeedback: false,
     negativeValidation: true,
     positiveValidation: true,
     positiveFeedback: true,
     showValidating: true,

     // Privacy Policy and Terms of Use
     privacyUrl: 'privacy',
     termsUrl: 'terms-of-use',

     // Redirects
     homeRoutePath: '/',
     redirectTimeout: 2000,

     // Hooks
     onLogoutHook: function(){
       console.log("Logging Out...");
       FlowRouter.go("/");
     },
     //onSubmitHook: mySubmitFunc,
     //preSignUpHook: myPreSubmitFunc,
     //postSignUpHook: myPostSubmitFunc,

     // Texts
    // texts: {
    //   button: {
    //       signUp: "Register Now!"
    //   },
    //   socialSignUp: "Register",
    //   socialIcons: {
    //       "meteor-developer": "fa fa-rocket"
    //   },
    //   title: {
    //       forgotPwd: "Recover Your Password"
    //   },
    // },
});

//Options.set('adminHomeRoute', '/');
const getUserIdentity = ( user ) => {
  let emails   = user.emails,
      services = user.services;

  if ( emails ) {
    return emails[ 0 ].address;
  } else if ( services ) {
    return _getEmailFromService( services );
  } else {
    return user.profile.name;
  }
};

const _getEmailFromService = ( services ) => {
  for ( let service in services ) {
    let current = services[ service ];
    return service === 'twitter' ? current.screenName : current.email;
  }
};
AccountsTemplates.configureRoute('signIn', {
  layoutType: 'blaze',
  name: 'signin',
  path: '/login',
  layoutTemplate: 'flow_layout',
  layoutRegions: {
    top: 'login_header'
  },
  contentRegion: 'main',
  redirect: '/'
});

AccountsTemplates.configureRoute('verifyEmail', {
  name: 'verifyEmail',
  path: '/verify-email',
  redirect: '/admin'
});

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPassword',
  path: '/reset-password',
  redirect: '/admin'
});

AccountsTemplates.configureRoute('enrollAccount', {
  name: 'enrollAccount',
  path: '/enroll',
  redirect: '/admin'
});
