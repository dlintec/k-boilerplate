
const oAuth= {
  "facebook": {
    "appId": orion.config.get('FACEBOOK_APP_ID'),
    "secret": orion.config.get('FACEBOOK_SECRET')
  },
  "github": {
    "clientId": "",
    "secret": ""
  },
  "google": {
    "clientId": "",
    "secret": ""
  },
  "twitter": {
    "consumerKey": "",
    "secret": ""
  }
}
const services = oAuth;

const configure = () => {
  if ( services ) {
    for( let service in services ) {
      console.log(service);
      ServiceConfiguration.configurations.upsert( { service: service }, {
        $set: services[ service ]
      });
    }
  }
};

configure();
