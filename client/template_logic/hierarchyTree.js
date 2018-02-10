Template.hierarchyTreeEditor.events({
  'click .demo_create': function(event,template){
    var ref = $('#jstree_demo').jstree(true),
      sel = ref.get_selected();
    if(!sel.length) { return false; }
    sel = sel[0];
    sel = ref.create_node(sel, {"type":"file"});
    if(sel) {
      ref.edit(sel);
    }
  },
  'click .demo_rename':function () {
    var ref = $('#jstree_demo').jstree(true),
      sel = ref.get_selected();
    if(!sel.length) { return false; }
    sel = sel[0];
    ref.edit(sel);
  },
  'click .demo_delete':function () {
    var ref = $('#jstree_demo').jstree(true),
      sel = ref.get_selected();
    if(!sel.length) { return false; }
    ref.delete_node(sel);
  },
})



Template.hierarchyTree.rendered = function() {
    console.log('hierarchyTree rendered:',this.data.id);
    $('#jstree_demo').jstree({
        "core" : {
          "animation" : 0,
          "check_callback" : true,
          'force_text' : true,
          "themes" : { "stripes" : true },
          'data' : [
               { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
               { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
               { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
               { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
            ]
        },
        "types" : {
          "#" : { "max_children" : 1, "max_depth" : 4, "valid_children" : ["root"] },
          "root" : { "icon" : "/static/3.3.4/assets/images/tree_icon.png", "valid_children" : ["default"] },
          "default" : { "valid_children" : ["default","file"] },
          "file" : { "icon" : "glyphicon glyphicon-file", "valid_children" : [] }
        },
        "plugins" : ["contextmenu", "dnd", "search","state", "types", "wholerow" ]
     });
     var to = false;
     $('#demo_q').keyup(function () {
       if(to) { clearTimeout(to); }
       to = setTimeout(function () {
         var v = $('#demo_q').val();
         $('#jstree_demo').jstree(true).search(v);
       }, 250);
     });
}

Template.hierarchyTree.onCreated(function() {
    const self = this;



  }
)
