console.log('[ dlintec ] divBuilder starting...');
/*Meteor.Loader.loadJs("/gsap/TweenMax.min.js",10000).fail(
  function() {

  }
);*/

$( document ).ready(function() {
    console.log( "divBuilder document ready!" );
});
//Meteor.Loader.loadJs("/fancytree/skin-win8/ui.fancytree.css");
//Meteor.Loader.loadJs("/fancytree/jquery.fancytree-all-deps.min.js");
if (typeof TweenMax == 'undefined'){
  Meteor.Loader.loadJs("/gs/TweenMax.js",
    function(e){
      console.log('GSAP loaded from public folder');
    }
    ,10000)
    .fail(function(e){
      Meteor.Loader.loadJs("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js",
        function(e){
          console.log('GSAP loaded from CDN');
        }
        ,10000)
        .fail(function(e){
          console.log('ERROR:no GSAP could be loaded');
        })

    });

}else{
  console.log('GSAP loaded.');
}




//console.log('TweenMax:',TweenMax);
//console.log('TimelineMax:',TimelineMax);


Session.set('divBuilderSession',{});
divBuilderObjects={};




uniqueHexId=function(pObject){
  var retryId=true;
  var newId="NEW";
  while (retryId) {
    newId=Random.hexString(6);
    retryId=(typeof pObject[newId] != 'undefined');
  }
  return newId;
}
/*
function mapDOM(element, json) {
    var treeObject = {};

    // If string convert to document Node
    if (typeof element === "string") {
        if (window.DOMParser) {
              parser = new DOMParser();
              docNode = parser.parseFromString(element,"text/xml");
        } else { // Microsoft strikes again
              docNode = new ActiveXObject("Microsoft.XMLDOM");
              docNode.async = false;
              docNode.loadXML(element);
        }
        element = docNode.firstChild;
    }

    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        object["type"] = element.nodeName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
                object["content"] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {
                        var theValue=nodeList[i].nodeValue;
                        var cleanValue=theValue.replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g,' ').replace(/^\s+|\s+$/,'')
                        if ((cleanValue.length > 1) || (theValue.charCodeAt(0) != 10)) {

                          object["content"].push(nodeList[i].nodeValue);

                        }
                    } else {
                        object["content"].push({});
                        treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                    }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["attributes"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].value;
                }
            }
        }
    }
    treeHTML(element, treeObject);

    return (json) ? JSON.stringify(treeObject) : treeObject;
}

*/


divBuilderSrcToHtml= function(pSrc){
  //console.log('divBuilderSrcToHtml:',pSrc);
  if ((typeof pSrc != 'undefined')){
    var fileExt=pSrc.split('.').pop();
    console.log('divBuilderSrcToHtml ext:',fileExt);
    switch (fileExt) {
      case 'svg': case 'png': case 'jpg': case 'jpeg':
        return "<img src="+pSrc+">" ;
        break;
      default:
        return "No html" ;
    }

  }else{
    return "";
  }
};
divBuilderHtml2json=function(pString){
  var data = { html: pString };
  //  This gives you a string in JSON syntax of the object above that you can
  // send with XMLHttpRequest.
  var json = JSON.stringify(data);
  return json;
}
divBuilder=function(pId){
  return divBuilderObjects[pId];
}

UI.registerHelper('getDictImage', function(pName) {
  var dictReturn=gridfsURL(orion.dictionary.get(pName));
  //console.log('getDict',pName,dictReturn);
  return dictReturn
});

Template.divBuilder.helpers({
  uuid: function () {
    return this.id;
  },
  divClasses: function () {
    if ((typeof this.class != 'undefined')){
      return "divBuilder " + this.class;
    }else{
      return "divBuilder ";
    }
  },
  divStyle: function () {
    if ((typeof this.style != 'undefined')){
      return this.style;
    }else{
      return "opacity:1;";
    }
  },

  divContent: function () {
    //console.log('divContent',this,Template.instance());
    if ((typeof this.src != 'undefined')){
      var reqParams=parse_url(this.src);
      var urlParams=parse_url(Meteor.absoluteUrl());
      var abs_url;
      //console.log('divContent src:',this.src,'schene',reqParams.scheme);

      //all request without schema are considered internal
      if (typeof reqParams.scheme == 'undefined') {
        abs_url=urlParams.scheme+'://'+urlParams.authority
        if ( this.src.charAt(0) != '/') {
          abs_url=abs_url+'/';
        }
        abs_url=abs_url+this.src;
      }else {
        abs_url=this.src;
      }

      var fileExt=abs_url.split('.').pop();

      //console.log('divBuilder loading:',fileExt,abs_url);
      switch (fileExt) {

        case 'png': case 'jpg': case 'jpeg':case 'bmp':case 'gif':
          return "<img src="+abs_url+">";
          break;
        default:
          var reqParams2=parse_url(abs_url);
          if (typeof reqParams2.scheme != 'undefined') {
            divBuilder(this.id).loadUrl(abs_url);
          }else{
            return "No html origin" ;
          }
      }

      return "Loading..." ;

      //return divBuilderSrcToHtml(this.src);

    }else{
      if ((typeof this.template != 'undefined')){
        return "{{>"+this.template+" "+this+"}}";
      }
      return "";

    }

  },
});

Template.divBuilder.events({
  'click .divBuilder': function(event,template){
    event.preventDefault();
    event.stopPropagation();
    if ( (template.lastClickedId == this.id) || ( typeof template.lastClickedId == 'undefined') ){
      //console.log("Click on divBuilder class - elem:",this.id,event,template);
    }else{

    }
    template.lastClickedId=this.id;
  },

  'dblclick .divBuilder':function(event,template){
    event.preventDefault();
    if ( (template.lastClickedId == this.id) || ( typeof template.lastClickedId == 'undefined') ){
      console.log("dblclick on divBuilder class - elem:",this.id,event,template);
      template.play();

    }else{

    }
    template.lastClickedId=this.id;

  },
  'keydown .divBuilder':function(event,template){
        console.log("keydown on divBuilder class - elem:",this.id,event,template);

  },

  'click *[data-uid]': function(event,template){
      //template.lastClickedId=event.toElement.id;
      var uid=event.target.getAttribute("data-uid");
      if (typeof uid != 'undefined') {
        event.preventDefault();
        event.stopPropagation();
        console.log("devBuilder click uid:",uid,event.target.id,event.target);
        template.lastClickedId=uid;
      }

  },

});

Template.divBuilder.rendered = function() {
    console.log('divBuilder rendered:',this.data.id);
    var theDiv=$('#'+this.data.id);
    if (theDiv.hasClass('fit')) {

      console.log('Fit:',theDiv);
    }
    divBuilder(this.data.id).adjust();
    //divBuilderObjects[this.data.id].element.attribute('preserveAspectRatio','xMidYMid slice');
}

Template.divBuilder.onCreated(function() {
  const self = this;
  if (typeof self.data.id == 'undefined'){
    self.data.id=uniqueHexId(divBuilderObjects);
    console.log('new uid created for divBuilder:',self.data.id);
  }
  divBuilderObjects[self.data.id]=self;
  //console.log('divBuilder onCreated:',this,divBuilderObjects);
  const dioramasHandle=this.subscribe('dioramas');
  self.divClasses= "divBuilder";
  self.divStyle= "border: 1px solid #cfcfcf;width:100px;height:100px;";
  self.scale=1;
  self.objectIndex={};
  self.registeredEvents={};
  self.starterData = {
    size: {
      width: 0,
      height: 0
    }
  };

  self.registerEvent=function (pEventName,pUid,pCallbackName) {

    if (typeof self.registeredEvents[pEventName] == 'undefined') {
      self.registeredEvents[pEventName]={};
    }

    self.registeredEvents[pEventName][pUid]=pCallbackName;
    //console.log('registerEvent:',pEventName,pUid,pCallbackName,self.registeredEvents[pEventName],self.registeredEvents);
  }


  self.notify=function (pEventName) {
    var eventObjects=self.registeredEvents[pEventName];
    if (typeof eventObjects != 'undefined') {

      for (var theUid in eventObjects) {
         if (eventObjects.hasOwnProperty(theUid)) {
            var callback=eventObjects[theUid];

            //console.log('notifying:',pEventName,theUid,callback);
            self[callback](theUid);

         }
      }
    }
  }

  self.attachData=function(pData){

  }


  self.loadHtmlString= function(pString){
    self.elementSelector="#"+self.data.id;
    self.element=$(self.elementSelector);
    self.contentElement=self.element.find('.divBuilderContent');
    //console.log('divBuilder loadHtmlString:',self.element);
    self.contentElement.empty();
    //var json = mapDOM(pString, false);
    var json ;
    var string2='...';
    try {
      json = html2json(pString);
      //console.log('json:',json);
      string2= json2html(json);
      //console.log('string2:',string2);
      self.contentElement.append(string2);
    } catch (e) {
      self.contentElement.append('<i class="fa fa-cog " aria-hidden="true"></i> Invalid HTLM string');
      console.log('loadHtmlString ERROR: Invalid HTML string',e);
      return;
    } finally {
    }
    //console.log('allElements:',htmlLoaded, element);
    self.buildObjectIndex();
    self.play();
  }

  self.buildObjectIndex = function(){
    //console.log('buildObjectIndex...',self.contentElement);

    var allElementsWithUId=self.contentElement.find( '*[data-uid]' );
    var allLinkedelements=self.contentElement.find( '*[data-linked-uid]' );

    var allElements=self.contentElement.find( "*" );
    //console.log('ALL ELEMENTS:',allElements,"with previous ID:",allElementsWithUId);

    self.starterData.size.width=0;
    self.starterData.size.height=0;
    for (var objId in self.objectIndex) {
      if (self.objectIndex.hasOwnProperty(objId)) {
        delete self.objectIndex[objId];

      }
    }
    var arrayLength = allElements.length;
    for (var i = 0; i < arrayLength; i++) {
        var element=allElements[i];
        var elementUid=element.getAttribute("data-uid");
        if (elementUid == null) {
          var uid=uniqueHexId(self.objectIndex);
          self.objectIndex[uid]={};
          element.setAttribute("data-uid",uid);
          elementUid=element.getAttribute("data-uid");
          //console.log('ASSIGN element data-uid:',uid);
        }

        var elementTag=element.tagName;
        var elementData = {};
        $.each(element.attributes, function() {
          if(this.specified) {
            elementData[this.name] = this.value;
          }
        });

        if ((typeof elementTag!='undefined')) {

          switch (elementTag) {
            case 'svg':
              //console.log('Element is svg:',element);
              if (! element.hasAttribute('viewBox')) {
                element.setAttribute('viewBox','0 0 '+element.getAttribute('width')+' '+element.getAttribute('height'));
                //console.log('svg new viewBox:',element);
              }

                //console.log('firstChild element is svg:',element);

              if (! element.hasAttribute('preserveAspectRatio')) {
                element.setAttribute('preserveAspectRatio','xMinYMin meet');
                //console.log('svg adding preserveAspectRatio:',element);
              }


            case 'png':  case 'jpg':  case 'jpeg': case 'svg':
              if ((i==0) ) {
                //
                //self.adjust();
                //element.setAttribute('width',self.element.width());
                //element.setAttribute('height',self.element.height());

                self.registerEvent('resize',elementUid,'adjustElement');

              }
              break;
            default:

          }
          self.starterData.size.width=Math.max(self.starterData.size.width,element.getAttribute('width'));
          self.starterData.size.height=Math.max(self.starterData.size.height,element.getAttribute('height'));

        }

        //console.log('  uid:',elementUid);
        var indexObject=self.objectIndex[elementUid];
        // no previous index
        if (typeof indexObject == 'undefined') {
          self.objectIndex[elementUid]={};
          indexObject=self.objectIndex[elementUid];
        }
        indexObject.element=element;
        indexObject.originalData=elementData;
    }
    if (self.data.scalable) {
      self.contentElement.width(self.starterData.size.width);
    }
    //console.log('self.objectIndex:',self.objectIndex,self.element);

    //self.adjust(self.data.width,self.data.height);
    self.adjust();

  }

  self.loadUrl= function(pUrl){
    console.log('divBuilder loadUrl:',pUrl);
    HTTP.call('GET', pUrl, {}, (error, result) => {
      if (!error) {
        var contentType=result.headers['content-type'];
        //console.log('divBuilder url loaded:',contentType);
        switch (contentType) {
          case 'image/svg+xml':case 'image/svg':
            self.loadHtmlString(result.content);

            break;
          case 'image/png':case 'image/jpg':case 'image/jpeg':
            self.loadHtmlString("<img src="+pUrl+">");
            break;
          default:
            if (contentType.startsWith('text/html')) {
              self.loadHtmlString(result.content);

            } else {
              self.loadHtmlString('Content not allowed:'+pUrl);

            }
        }
      }else{
        console.log('divBuilder error loading file:',error);
      }
    });
  }
  self.onResize=function () {
    //console.log('onResize...');
    //self.adjust(self.data.width,self.data.height);
    self.adjust();
  }
  self.adjust=function ( px,py) {
    self.element=$('#'+self.data.id);
    self.contentElement=self.element.find('.divBuilderContent');
    var newMaxWidth,newMaxHeight;
    var elementParent;
    var adjustWidth=true,adjustHeight=true;
    var width = self.contentElement.width();    // Current image width
    var height = self.contentElement.height();  // Current image height

    if (typeof px=='object') {
      elementParent=px;
      newMaxWidth=elementParent.width();
      newMaxHeight=elementParent.height();
    }else{
      elementParent=self.element.parent();
      if ((typeof px=='undefined') && (typeof py=='undefined')) {
        //obtain size from object parameters (data.width and data.height)
        newMaxWidth=self.data.width;
        newMaxHeight=self.data.height;
        /*newMaxWidth=self.element.width();
        newMaxHeight=self.element.height();*/

      }else{
        newMaxWidth=px;
        newMaxHeight=py;
      }
    }
    var parentOverflowX=elementParent.css('overflow-x');
    var parentOverflowY=elementParent.css('overflow-y');

    if ((typeof newMaxWidth == 'undefined') && (parentOverflowX!='auto') ) {
      //  console.log('to parent width',parentOverflowY);
        newMaxWidth=Math.min(elementParent.width(),window.innerWidth);
    }
    if ( (typeof newMaxHeight == 'undefined') && (parentOverflowY!='auto')) {
      //console.log('to parent height',parentOverflowY);
        newMaxHeight=Math.min(elementParent.height(),window.innerHeight);
    }

    var maxWidth = newMaxWidth; // Max width for the image
    var maxHeight = newMaxHeight;    // Max height for the image

    var $el = self.contentElement;
    var elHeight = $el.outerHeight();
    var elWidth = $el.outerWidth();

    var $wrapper = self.element;

  /*  $wrapper.resizable({
      resize: doResize
    });*/

    function doResize(event, ui) {

      var scale, origin;
      if ((self.data.scalable)  ){
        scale = Math.min( newMaxWidth /ui.size.width,  newMaxHeight/ui.size.height  );
        //console.log('scaling:',scale,ui,newMaxWidth,newMaxHeight);
      }else {
        scale=self.scale;
        //console.log('scaling:',scale,ui,newMaxWidth,newMaxHeight);
      }
      $el.css({
        transform: "scale(" + scale + ")"
      });

    }
    doResize(null, self.starterData);
    //var fitToParent=self.element.hasClass('fit');
    if (self.data.scalable) {
      //console.log($el[0].getBoundingClientRect().width);
      self.element.height($el[0].getBoundingClientRect().height);

    }
    if (typeof self.data.width != 'undefined') {
      self.element.width(self.data.width);
    }
    if (typeof self.data.height != 'undefined') {
      self.element.height(self.data.height);
    }
    if ( (parentOverflowX!='auto') && (parentOverflowY!='auto')) {
      self.notify('resize');
    }
  }

  self.adjustElement=function(pUid){
    var indexElement=self.objectIndex[pUid];


    var refElement;
    if (self.data.scalable) {
      refElement=self.contentElement;
    } else {
      refElement=self.element;
    }
    var originalWidth= indexElement.originalData.width;
    var originalHeight= indexElement.originalData.height;
    var refWidth=refElement.width();
    var refHeight=refElement.height();


    indexElement.element.setAttribute('height',refHeight);

    indexElement.element.setAttribute('width',refWidth);

    //console.log('adjustElement:',pUid,originalWidth,originalHeight,indexElement,self.element);








  }


  self.play= function(pScene){
    //var element=document.getElementById(self.data.id);
    //in 2 seconds, fade back in with visibility:visible

    var tl = new TimelineMax();
    var shapes = self.element.find("rect, circle, ellipse, polyline, path");
    var texts = self.element.find("text");
    //console.log('divBuilder play...',shapes);
    //firstChild.attr('preserveAspectRatio','xMidYMid slice');
    //firstChild.attr('width','100%');
    //firstChild.attr('height','40vh');
    TweenMax.to(texts, 0, {opacity:0});
    //TweenMax.to(self.element, 3, {autoAlpha:1, delay:.5});

    //tl.yoyo(true).repeat(2);


    tl.staggerFrom(shapes, 2, {drawSVG:"0% 0%",fillOpacity:0, stroke:"white", strokeWidth:4}, 0.5)
      .staggerTo(shapes, 1, {drawSVG:"0% 100%"}, 0.5)
      .staggerTo(texts,1,{opacity:1},1,'-=5')
      //.fromTo(shapes, 0.1, {drawSVG:"0%"}, {drawSVG:"10%", immediateRender:false}, "+=0.1")
      //.staggerTo(shapes, 1, {drawSVG:"90% 100%"}, 0.5)
      //.to(shapes, 1, {rotation:360, scale:0.5, drawSVG:"100%", stroke:"white", strokeWidth:6, transformOrigin:"50% 50%"})
      //.staggerTo(shapes, 0.5, {stroke:"white", opacity:0}, 0.2)
      //.staggerTo(shapes, 0.5, {stroke:"black", strokeWidth:"0", scale:1, opacity:1}, 0.2)
      ;
  }

  self.json= function(){
    var element = document.getElementById(self.data.id);
      var json = html2json(element.innerHTML);
    return json;
  }

  this.autorun(() => {
    console.log('divBuilder autorun- this:',this,'self:',self.element);
    FlowRouter.watchPathChange();
    const dioramasIsReady = dioramasHandle.ready();
    //console.log(`divBuilder dioramas Handle is ${dioramasIsReady ? 'ready' : 'not ready'}`);
    //document.title = orion.dictionary.get('site.title', 'dlintec');
  });
  window.addEventListener("resize", self.onResize );


});

Template.divBuilder.onDestroyed(function() {
  delete divBuilderObjects[this.data.id];
  //console.log('devBuilder onDestroyed',this.data.id,divBuilderObjects);
});
