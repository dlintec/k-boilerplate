Meteor.startup(function () {

process.env.MAIL_URL = 'smtp://'+orion.config.get('SMTP_ACCOUNT')+':'+orion.config.get('SMTP_PASSWORD')+'@'+orion.config.get('SMTP_SERVER');
console.log("smtp user:",orion.config.get('SMTP_ACCOUNT'));
console.log("smtp server:",orion.config.get('SMTP_SERVER'));
console.log("smtp alert account:",orion.config.get('SEND_ALERTS_MAIL'));
});

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }
});

Accounts.emailTemplates.siteName = orion.config.get('MAILS_APP_NAME');
Accounts.emailTemplates.from     = orion.config.get('MAILS_APP_NAME')+"<"+orion.config.get('MAILS_FROM')+">";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "["+Accounts.emailTemplates.siteName+"] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@godunk.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};
