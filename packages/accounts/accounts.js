orion.accounts = {};

/**
 * Initialize the profile schema option with its default value
 */
Options.init('profileSchema', {
  name: {
    type: String,
    label: orion.helpers.getTranslation('accounts.schema.profile.name')
  },
  language: {
    type: String,
    label: function (){return i18n('global.language');},
    optional: true,
    allowedValues: ['Español', 'English'],

  }
});

/**
 * Updates the profile schema reactively
 */
Tracker.autorun(function () {
  orion.accounts.profileSchema = new SimpleSchema({
    profile: {
      type: new SimpleSchema(Options.get('profileSchema'))
    }
  });
});

/**
 * Initialize accounts options
 * If there is no admin, we allow to create accounts
 */
Options.init('defaultRoles', []);
Options.init('forbidClientAccountCreation', true);

/**
 * We will use listen instead of tracker because on client tracker starts after meteor.startup
 */
Options.listen('forbidClientAccountCreation', function(value) {
  AccountsTemplates.configure({
    forbidClientAccountCreation: (!!orion.adminExists) && (!!value),
  });
});

/**
 * Adds the "name" field to the sign up form
 */
AccountsTemplates.addField({
  _id: 'name',
  type: 'text',
  displayName: Meteor.isClient ? i18n('accounts.register.fields.name') : 'Name',
  placeholder: Meteor.isClient ? i18n('accounts.register.fields.name') : 'Your Name',
  required: true,
});
//AccountsTemplates.addField({
//  _id: 'language',
//  type: 'text',
  //displayName: Meteor.isClient ? i18n('global.language') : 'language',
  //placeholder: Meteor.isClient ? i18n('global.language') : 'english',
//  required: false,
//});
UsersEmailsSchema = new SimpleSchema({
  emails: {
    type: [Object],
    optional: true,
    label: orion.helpers.getTranslation('accounts.schema.emails.title')
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: orion.helpers.getTranslation('accounts.schema.emails.address')
  },
  'emails.$.verified': {
    type: Boolean,
    label: orion.helpers.getTranslation('accounts.schema.emails.verified')
  }
});

SimpleSchema.messages({
  'passwordMismatch': i18n('global.passwordNotMatch')
});

UsersPasswordSchema = new SimpleSchema({
  password: {
    type: String,
    label: orion.helpers.getTranslation('accounts.schema.password.new'),
    min: 8,
    autoform: {
      type: 'password'
    }
  },
  confirm: {
    type: String,
    label: orion.helpers.getTranslation('accounts.schema.password.confirm'),
    min: 8,
    autoform: {
      type: 'password'
    },
    custom: function () {
      if (this.value !== this.field('password').value) {
        return 'passwordMismatch';
      }
    }
  },
});
