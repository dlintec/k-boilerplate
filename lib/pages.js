orion.pages.addTemplate({
    layout: 'pagesLayout',
    template: 'pagesSimple',
    name: 'Simple',
    description: 'Default page template'
}, {
    content: orion.attribute('summernote', {
      label: 'Contenido'
    }),
    menu: {
       label: 'Menu',
       type: String,
       allowedValues: ["topmenu","footer"],
       optional: true
    },
})
orion.pages.addTemplate({
    layout: 'pagesLayout',
    template: 'reactTemplate',
    name: 'React test',
    description: 'Pruebas con react'
}, {
    content: orion.attribute('summernote', {
      label: 'Content'
    })
})

Meteor.startup(function(){
  //ReactiveTemplates.set("pages.update", "orionBootstrapPagesUpdate");
/*  Router.route('/pages/:url', function() {
    var subs = Meteor.subscribe('page', this.params.url);
    if (subs.ready()) {
      var page = orion.pages.collection.findOne({ url: this.params.url });
      if (page) {
        var template = orion.pages.templates[page.template];
        if (template.layout) {
          this.layout(template.layout);
        }
        this.render(page.template, {data: page});
      } else {
        this.render('notFound');
      }
    } else {
      this.render('');
    }
  }, { name: 'pages' });



  FlowRouter.route('/pages/:url', function() {
      var subs = Meteor.subscribe('page', this.params.url);
      if (subs.ready()) {
        var page = orion.pages.collection.findOne({ url: this.params.url });
        if (page) {
          var template = orion.pages.templates[page.template];
          if (template.layout) {
            BlazeLayout.layout(template.layout);
          }
          BlazeLayout.render(page.template, {data: page});
        } else {
          BlazeLayout.render('notFound');
        }
      } else {
        BlazeLayout.render('');
      }
    }
  });
  */
});
