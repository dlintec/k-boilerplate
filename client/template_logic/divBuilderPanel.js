divBuilderPanels={};

mydragg = function(){
      return {
          move : function(divid,xpos,ypos){

              //var divid=pdivid.parentNode;
              divid.style.left = xpos + 'px';
              divid.style.top = ypos + 'px';
          },
          startMoving : function(divid,container,evt){
              //var divid=pdivid.parentNode;
              var thisPanel=divBuilderPanels[container.id];
              var thisPanelJQ=$('#'+container.id);
              var contentDivJQ=thisPanelJQ.find('.divBuilderPanelWindow');
              //console.log('startMoving',thisPanel,contentDivJQ);
              var canDrag=thisPanel.canDrag(evt.offsetX,evt.offsetY);
              if ((thisPanel.maximized) || (! canDrag ) ) {
                console.log('not Draggable');
                return;
              }
              thisPanel.rect=contentDivJQ.get(0).getBoundingClientRect();
              contentDivJQ.css('-webkit-transition','none');
              contentDivJQ.css('-o-transition','none');
              contentDivJQ.css('transition','none');

              contentDivJQ.css('left','0');
              contentDivJQ.css('transform', 'translateX(0%)');
              divBuilderRestorePanel(container.id);
              evt = evt || window.event;
              var posX = evt.clientX,
                  posY = evt.clientY,
              divTop = divid.style.top,
              divLeft = divid.style.left,
              eWi = parseInt(divid.style.width),
              eHe = parseInt(divid.style.height),
              cWi = parseInt(document.getElementById(container.id).style.width),
              cHe = parseInt(document.getElementById(container.id).style.height);
              document.getElementById(container.id).style.cursor='move';
              divTop = divTop.replace('px','');
              divLeft = divLeft.replace('px','');
              var diffX = posX - divLeft,
                  diffY = posY - divTop;
              document.onmousemove = function(evt){
                  evt = evt || window.event;
                  var posX = evt.clientX,
                      posY = evt.clientY,
                      aX = posX - diffX,
                      aY = posY - diffY;
                      if (aX < 0) aX = 0;
                      if (aY < 0) aY = 0;
                      if (aX + eWi > cWi) aX = cWi - eWi;
                      if (aY + eHe > cHe) aY = cHe -eHe;
                      mydragg.move(divid,aX,aY);
              }
          },
          stopMoving : function(container){
            var thisPanelJQ=$('#'+container.id);
            var contentDivJQ=thisPanelJQ.find('.divBuilderPanelWindow');

            contentDivJQ.css('-webkit-transition','all .2s ease-in-out');
            contentDivJQ.css('-o-transition','all .2s ease-in-out');
            contentDivJQ.css('transition','all .2s ease-in-out');

            var a = document.createElement('script');
            document.getElementById(container.id).style.cursor='default';
            document.onmousemove = function(){}
          },
      }
  }();

divBuilderPanel=function(pPanelId){
  var thisPanel=divBuilderPanels[pPanelId];
  return thisPanel;
}
divBuilderClosePanel=function functionName(pPanelId) {
  var panelObject=divBuilderPanels[pPanelId];
  if (typeof panelObject != 'undefined') {
     $( "#"+pPanelId ).remove();
     delete divBuilderPanels[pPanelId];
     console.log('closing panel:',pPanelId);
  }else{
    console.log('closing panel (not found):',pPanelId);

  }
}


divBuilderMaximizePanel=function functionName(pPanelId) {
  var thisPanel=divBuilderPanels[pPanelId];
  var thisPanelJQ=$('#'+pPanelId);
  var contentDivJQ=thisPanelJQ.find('.divBuilderPanelWindow');
  thisPanelJQ.rect=contentDivJQ.get(0).getBoundingClientRect();
  thisPanel.rect=contentDivJQ.get(0).getBoundingClientRect();
  console.log('rect:',thisPanel.rect);
  contentDivJQ.css('max-width','100%');
  contentDivJQ.css('max-height','100vh');
  contentDivJQ.css('width','100%');
  contentDivJQ.css('height','100vh');
  contentDivJQ.css('top','0');
  contentDivJQ.css('left','0');
  contentDivJQ.css('transform', 'translateX(0%)');
  thisPanel.maximized=true;
}
divBuilderRestorePanel=function functionName(pPanelId) {
  var thisPanel=divBuilderPanels[pPanelId];
  var thisPanelJQ=$('#'+pPanelId);
  var contentDivJQ=thisPanelJQ.find('.divBuilderPanelWindow');
  //contentDivJQ.css('min-width','50%');
  //contentDivJQ.css('min-height','30vh');
  contentDivJQ.css('width',thisPanel.rect.width);
  contentDivJQ.css('height',thisPanel.rect.height);
  contentDivJQ.css('top',thisPanel.rect.top);
  contentDivJQ.css('left',thisPanel.rect.left);
  thisPanel.maximized=false;

}
divBuilderOpenPanel=function functionName(pPanelId,pTemplate,pData) {
  var panelClasses='divBuilderPanel modal ';
  var alreadyOpened=false;
  var panelObject;
  var panelId;
  if (typeof pPanelId != 'undefined') {
    panelId=pPanelId;
    alreadyOpened=(typeof divBuilderPanels[panelId] != 'undefined');
  }else{
    panelId=uniqueHexId(divBuilderPanels);
  }

  if (typeof pClasses != 'undefined') {
    panelClasses=panelClasses+' '+pClasses;
  }

  if ( ! alreadyOpened){
    var zindex=6001+Object.keys(divBuilderPanels).length;
    $('body').append(
        "<div id='"+panelId+"' style='z-index:"+zindex+";'  class='"+panelClasses+"'>\
        </div>"
    );
    Blaze.renderWithData(Template.divBuilderPanel,{id:panelId,template:pTemplate, params:pData},$('#'+panelId)[0]);
    //var panelObject=$('#'+panelId);
    //divBuilderPanels[panelId]=panelObject;
    console.log('divBuilder new panel created:',panelId,"z:",zindex,Object.keys(divBuilderPanels).length);
    $( "#"+panelId).find(".divBuilderPanelWindow" ).draggable({ handle: ".divBuilderTitle"  });
    $( "#"+panelId).find(".divBuilderPanelWindow" ).resizable();
  }else {
    console.log('divBuilder reopening panel:',panelId);
    //panelObject=divBuilderPanels[panelId];
  }
  //console.log('divBuilderOpenPanel',panelObject,'id:',panelObject.attr('id'),panelClasses);
  return panelId;
}

Template.divBuilderPanel.helpers({
  isHtml: function () {
    var tString=""+this.template;
    //console.log('panel ishtml:',tString,Template[this.template]);
    return (tString.charAt(0) == '<');
  },
  content: function () {
    var tString=""+this.template;
    console.log('panel content:',tString,Template[tString]);

    if (tString.charAt(0) == '<'){
      return tString;
    }else{
      //return Template[tString];
      //return Handlebars.SafeString(Template[tString](this.params));
      return tString;
    }

  },
  params:function () {
    return this.params;
  },
  panelElement:function () {
    return this.id;
  },

  title: function () {
    return this.params.title;
  }
});
Template.divBuilderPanel.events({
  'click .close-panel': function(event,template){
    console.log('click .close-panel:',this.id);
    divBuilderClosePanel(this.id);

  },

  'click .toggle-fullscreen': function(event,template){
    console.log('click .toggle-fullscreen:',this.id);
    if (template.maximized) {
      divBuilderRestorePanel(this.id);
    } else {
      divBuilderMaximizePanel(this.id);
    }


  },
});


Template.divBuilderPanel.onCreated(function() {
  console.log('divBuilderPanel created');
  const self = this;
  self.canDrag = function(px,py){
    console.log('check canDrag:',px,py);
    return true;
  }


  self.modal=true;
  self.height='';
  if (typeof self.data.id == 'undefined'){
    self.data.id=uniqueHexId(divBuilderObjects);
    console.log('new uid created for divBuilderPanel:',self.data.id);
  }
  divBuilderPanels[self.data.id]=self;

});

Template.divBuilderPanel.onDestroyed(function() {
  delete divBuilderPanels[this.data.id];
  console.log('divBuilderPanel onDestroyed',this.data.id,divBuilderPanels);

});
