Package.describe({
  name: 'orionjs:s3',
  summary: 'S3 storage for orion:filesystem',
  version: '1.8.1',
  git: 'https://github.com/orionjs/s3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'ecmascript@0.1.6',
    'orionjs:core@1.8.1',
    'orionjs:filesystem@1.8.1',
    'orionjs:config@1.8.1',
    'lepozepo:s3@5.1.1'
    ]);

  api.addFiles([
    's3.js',
    ]);

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:filesystem');
});
