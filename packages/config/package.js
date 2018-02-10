Package.describe({
  name: 'orionjs:config',
  summary: 'Orion Filesystem',
  version: '1.8.1',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'blaze-html-templates@1.0.1',
    'ecmascript@0.1.6',
    'orionjs:lang-es@1.8.1',
    'orionjs:base@1.8.1',
    'aldeed:simple-schema@1.3.3',
    'aldeed:collection2@2.3.3',
    'matb33:collection-hooks@0.7.13',
    'meteorhacks:inject-initial@1.0.2',
    ]);

  api.addFiles([
    'config.js',
    'admin.js'
    ]);

  api.addFiles([
    'config_server.js'
    ], 'server');

  api.addFiles([
    'config_client.js'
    ], 'client');

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
