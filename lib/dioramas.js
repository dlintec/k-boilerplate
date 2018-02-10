console.log('Dioramas.js');
Dioramas = new orion.collection('Dioramas', {
  singularName: 'diorama',
  pluralName: 'dioramas',
  link: {
    title: 'dioramas'
  },
  tabular: {
    name: "dioramas",
    columns: [
      {data: 'order', title:  function (){return i18n('global.order');}, width: '20%'},
      {data: 'title', title: function (){return i18n('global.title');}},
      {data: 'createdBy', title: function (){return i18n('global.createdBy');}},
      {data: 'updatedAt', title: function (){return i18n('global.updatedAt');}}
    ]
  }
});
//  console.log(`Dioramas.attachSchema: ${i18n('global.title' )}`);
Dioramas.attachSchema(new SimpleSchema({

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
  }),
  createdAt: orion.attribute('createdAt'),
  updatedAt: orion.attribute('updatedAt'),
  createdBy: orion.attribute('createdBy')
}));
