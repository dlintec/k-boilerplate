scrollToSection=function(e){
  e.preventDefault();
  var path = e.currentTarget.attributes['href'].value;
  var section = $("#" + path);
  var targetref=new String(e.currentTarget.baseURI + path) ;
  var commonstr=commonString(e.currentTarget.href,e.currentTarget.baseURI);

  console.log(`href=${e.currentTarget.href}`);
  console.log(`baseURI=${e.currentTarget.baseURI}`);
  console.log(`target=${targetref}`);
  console.log(`comun=${commonstr}`);

  console.log(e,section);
  //if ( (e.currentTarget.href != e.currentTarget.baseURI) && (e.currentTarget.href != targetref) ){
  //  console.log(`DIFERENCIA destino=${commonstr}#${path}`);
  //  //window.location.assign(`${commonstr}#${path}`);
  //}else{
    //window.history.pushState(path, "", "/" + section);
    window.history.pushState(path, "", "/");
    Session.set('scrolling', true);
    $('html, body').animate({
      scrollTop: section.offset().top
    }, 1000, function() { Session.set('scrolling', false);});
//  }


} ;


scrollToHome=function(){
  Session.set('scrolling', true);
  $('html, body').animate({
    scrollTop: 0
  }, 500);
},

commonString=function (lcstest, lcstarget) {
 matchfound = 0
 lsclen = lcstest.length
  for(lcsi=0; lcsi<lcstest.length; lcsi++){
   lscos=0
    for(lcsj=0; lcsj<lcsi+1; lcsj++){
     re = new RegExp("(?:.{" + lscos + "})(.{" + lsclen + "})", "i");
     temp = re.test(lcstest);
     re = new RegExp("(" + RegExp.$1 + ")", "i");
      if(re.test(lcstarget)){
       matchfound=1;
       result = RegExp.$1;
       break;
       }
     lscos = lscos + 1;
     }
     if(matchfound==1){return result; break;}
    lsclen = lsclen - 1;
   }
  result = "";
  return result;
 }
gridfsURL=function(pURL) {
  var urlParams=parse_url(Meteor.absoluteUrl(pURL));
  var abs_url=urlParams.scheme+'://'+urlParams.authority+pURL
  //console.log('gridfsURL helper:',abs_url,Template.instance().view.name);
  //  new_value.url=abs_url;

  return abs_url;
}

 Template.registerHelper('gridfsURL', gridfsURL);
