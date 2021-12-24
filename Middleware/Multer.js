const multer = require("multer");
const path = require('path');

module.exports.files={
storage:function(){

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() )
      //cb(null, file.fieldname + '-' + Date.now())
    }
  })


  return storage;
},
allowedFile: function(req,file,cb){
    if (!file.originalname.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only  files are allowed!';
        return cb(new Error('Solo archivos permitidos'), false);
    }
    cb(null, true);
}
}
  
//const upload = multer({ storage: storage });
