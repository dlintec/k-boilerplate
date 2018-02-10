/**
 * Return the base64 representation of the image
 */
orion.helpers.getBase64Image = function(file, callback) {
  var FR = new FileReader();
  console.log("getBase64Image",file);
  FR.onload = function(e) {
      console.log("FR.onload",file,e);
    callback(e.target.result);
  };
  if (file.size > 1000000){
    Resizer.resize(file, {width: 1080, height: 1080, cropSquare: false}, function(err, fileResized) {

        console.log("Resizer.resize",err,fileResized,file);
        FR.readAsDataURL(fileResized);
    });

  }else{
    FR.readAsDataURL(file);
  }


};
