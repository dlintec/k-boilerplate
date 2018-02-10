Accounts.onCreateUser( ( options, user ) => {
  let profile = options.profile;

  //Modules.server.sendWelcomeEmail( user, profile );

  if ( profile ) {
    user.profile = profile;
  }
  console.log("onCreateUser:",user);
  return user;
});
