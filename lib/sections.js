Sections = new orion.collection('sections', {
  singularName: 'sección',
  pluralName: 'secciones',
  link: {
    title: 'Secciones'
  },
  tabular: {
    name: "Secciones**",
    columns: [
      {data: 'order', title:  function (){return i18n('global.order');}, width: '20%'},
      {data: 'title', title: function (){return i18n('global.title');}}
    ]
  }
});
//  console.log(`Sections.attachSchema: ${i18n('global.title' )}`);
Sections.attachSchema(new SimpleSchema({

  title: {
    type: String,
    label: 'Title'
  },
  id: {
    type: String,
    label: "Id"
  },
  order: {
    type: Number,
    label: function (){return i18n('global.order');}
  },
  headline: {
    type: String,
    optional: true,
    label: "Headline"
  },
  thumb: orion.attribute('image', {
    label: "thumb image (optional)",
    optional: true
  }),
  detail: {
    type: String,
    optional: true,
    label: "More detail",
    autoform: {
      type: 'textarea'
    }
  },
  content:   orion.attribute('summernote', {
      label: 'Content'
    }),
  backgroundColour: {
    type: String,
    autoform: {
      type: "bootstrap-colorpicker"
    },
    label: "Background colour (optional)",
    optional: true
  },
  textColour: {
    type: String,
    autoform: {
      type: "bootstrap-colorpicker"
    },
    label: "Text colour (optional)",
    optional: true
  },
  backgroundImage: orion.attribute('image', {
    label: "Background image (optional)",
    optional: true
  })
}));

orion.dictionary.addDefinition('topSections', 'home',
  orion.attribute('hasMany', {
    label: 'Top Sections'
  }, {
    collection: Sections,
    titleField: 'name',
    additionalFields: ['title'],  // we must add the active field because we use it in the filter
    publicationName: 'youCanPutAnyStringYouWantHere2',
    /**
     * To return only the active products
     */
    filter: function(userId) {
      return { active: true };
    }
  })
);
