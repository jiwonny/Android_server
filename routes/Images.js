const router = require('express').Router();
var fs = require('fs');
var formidable = require('formidable')
const Images = require('../models/Image');

// Find All
router.get('/', (req, res) => {
  Images.findAll()
    .then((images) => {
      if (!images.length) return res.status(404).send({ err: 'User not found' });
      res.send(images);
    })
    .catch(err => res.status(500).send(err));
});

// Find Images from LoginID
router.get('/getImageList/:Login_id', (req, res) =>{
  Images.findImagesByID(req.params.Login_id)
    .then((images) => {
      if (!images.length) return res.status(404).send({ err: 'User not found' });
      res.send(images);
    })
    .catch(err => res.status(500).send(err));
});

// Delete Images by LoginID & Url
router.delete('/delete/:Login_id/:url', (req,res) =>{

  fs.unlink('images/'+req.params.url,(err)=>
  { console.log(delete successfull);
  });

  Images.deleteByidandurl(req.params.Login_id, req.params.url)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));


});

// create Image
router.post('/Login_id/:Login_id',(req, res) => {
  Images.create(req.body)
    .then(image => res.send(image))
    .catch(err => res.status(500).send(err));
});

router.post('/:Login_id/:Name', (req, res, next) => {
  var files_array = new Array();
  var files = new Array();
  var form = new formidable.IncomingForm();
  var filename;
  form.encoding = 'utf-8';
  form.uploadDir = 'images';
  form.multiples = true;
  form.keepExtensions = true;

  form.on('file', function(field, file){
    console.log('[file]'+ field, file);
    filename = form.uploadDir+ '/' +req.params.Login_id+'_'+file.name;
    fs.rename(file.path,filename ,function(err){
      if (err) throw err;
      console.log('renamed complete');
    });

    files.push([field,file]);
    files_array.push(file.name);
    Images.insertinto(req.params.Login_id, req.params.Name, req.params.Login_id+'_'+file.name)
      .then(() => res.send("success"))
      .catch(err => res.send("duplicate"));

  }).on('end',function(){
    console.log('---------------------------<files>------------');
    for(var i=0; i<files_array.length; i++){
      console.log('files['+i+']'+files_array[i]);
    }

  }).on('error',function(error){
    console.log('error:::::::::::::'+error);
  })

  form.parse(req, function(error,filed,file){
    console.log('error : '+error + ', file : ' + file);
    console.log('upload sucesss.......');
  })
});

module.exports = router;
