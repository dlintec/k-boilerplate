orion.dictionary.addDefinition('logoBig', 'site',
  orion.attribute('image', {
    label: "LogoBig"
  })
);

orion.dictionary.addDefinition('title', 'site', {
  type: String,
  label: "Encabezado"
});

orion.dictionary.addDefinition('description', 'site', {
  type: String,
  label: "Description"
});
orion.dictionary.addDefinition('main_content', 'site',
  orion.attribute('summernote', {
    label: 'Main Content'
  })
);

orion.dictionary.addDefinition('logo', 'site',
  orion.attribute('image', {
    label: "Menu Logo"
  })
);
orion.dictionary.addDefinition('menuBackground', 'site', {
  type: String,
  autoform: {
    type: "bootstrap-colorpicker"
  },
  label: "Menu background colour",
  optional: true,
  defaultValue: '#ffffff'
});
orion.dictionary.addDefinition('menuText', 'site', {
  type: String,
  autoform: {
    type: "bootstrap-colorpicker"
  },
  label: "Menu text colour",
  optional: true,
  defaultValue: '#888888'
});
orion.dictionary.addDefinition('pdf', 'site',
  orion.attribute('file', {
    label: "archivo"
  })
);
orion.dictionary.addDefinition('heroImage', 'site',
  orion.attribute('image', {
    label: "Hero Image"
  })
);

orion.dictionary.addDefinition('defaultColour', 'site', {
  type: String,
  autoform: {
    type: "bootstrap-colorpicker"
  },
  label: "Default background colour",
  optional: true
});

orion.dictionary.addDefinition('images', 'home',
    orion.arrayOfAttribute('image', {
        label: "Images"
    })
);
