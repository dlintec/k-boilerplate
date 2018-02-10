Package.describe({
  name: 'orionjs:core',
  summary: 'A framework that makes complex as well as simple apps possible with minimal effort',
  version: '1.8.1',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'blaze-html-templates@1.0.1',
    'ecmascript@0.1.6',
    'orionjs:base@1.8.1',
    'orionjs:accounts@1.8.1',
    'orionjs:config@1.8.1',
    'orionjs:collections@1.8.1',
    'orionjs:dictionary@1.8.1',
    'orionjs:attributes@1.8.1',
    'orionjs:lang-es@1.8.1'
    ]);

  api.imply([
    'orionjs:lang-en',
    'orionjs:base',
    'orionjs:accounts',
    'orionjs:config',
    'orionjs:collections',
    'orionjs:dictionary',
    'orionjs:attributes',
    ]);

  api.export('orion');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
