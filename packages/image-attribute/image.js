ReactiveTemplates.onRendered('attribute.image', function () {
  Session.set('uploadProgress' + this.data.name, null);
  Session.set('image_base64' + this.data.name, null);
  Session.set('isUploading' + this.data.name, false);
  Session.set('image' + this.data.name, this.data.value);
    }
);

ReactiveTemplates.helpers('attribute.image', {
  base64: function() {
    return Session.get('image_base64' + this.name);
  },
  uploadingClass: function() {
    return Session.get('isUploading' + this.name) ? 'uploading' : '';
  },
  progress: function() {
    return Session.get('uploadProgress' + this.name);
  },
  image: function() {
    var session_value=Session.get('image' + this.name);
    if (typeof session_value != 'undefined') {
      var urlParams=parse_url(Meteor.absoluteUrl(session_value.url));
      var abs_url=urlParams.scheme+'://'+urlParams.authority+session_value.url
      //console.log(" sessionvalue exists:"+session_value);
      var new_value=_.clone(session_value);
      new_value.url=abs_url;
      return new_value;
    }else{
      //console.log(" sessionvalue:"+session_value);
      return session_value;
    }

  }
});

ReactiveTemplates.events('attribute.image', {
  'click .btn-remove': function(event, template) {
    var file = Session.get('image' + template.data.name);
    if (file && file.fileId) {
      orion.filesystem.remove(file.fileId);
    }
    Session.set('image' + template.data.name, null);
    Session.set('uploadProgress' + template.data.name, null);
    Session.set('image_base64' + template.data.name, null);
    Session.set('isUploading' + template.data.name, false);
  },
  'change input': function(event, template) {
    if (orion.filesystem.isUploading()) return;

    var self = this;
    var files = event.currentTarget.files;
    if (files.length != 1) return;
    //console.log("before orion.helpers.getBase64Image",files, event);

    orion.helpers.getBase64Image(files[0], function(base64) {
      Session.set('image_base64' + self.name, base64);

      var upload = orion.filesystem.upload({
        fileList: files,
        name: files[0].name,
        uploader: 'image-attribute'
      });

      Session.set('isUploading' + self.name, true);
      Session.set('uploadProgress' + self.name, 1);

      Tracker.autorun(function () {
        if (upload.ready()) {
          if (upload.error) {
            Session.set('image' + self.name, null);
            console.log(upload.error);
            alert(upload.error.reason);
          } else {
            var information = orion.helpers.analizeColorFromBase64(base64);
            Session.set('image' + self.name, {
              fileId: upload.fileId,
              url: upload.url,
              info: information
            });
          }
          Session.set('isUploading' + self.name, false);
        }
      });
      Tracker.autorun(function () {
        Session.set('uploadProgress' + self.name, upload.progress());
      });
    })
  }
});
