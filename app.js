const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const uploadController = require('./controller/upload');
const uploadRoutes = require('./routes/upload');
const { randomBytes } = require('crypto');
const mongoose = require('mongoose');


const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./excel');
    },
    filename: (req,file,cb) => {
        cb(null,  Date.now() +' ' + file.originalname)
    }
})

const fileFilter =(res, file, cb) =>{
    if(!file.originalname.match(/\.(xls|xlsx)$/)){
      return cb(new Error('Please upload a excel file'));
    }
    cb(undefined, true)
  }

app.use('/excel', express.static(path.join(__dirname, 'excel')));

app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single("file"));

app.use(bodyParser.json());

app.post('/', uploadRoutes );


mongoose
  .connect(
    'mongodb+srv://abhi:abhi@hi.mwcxr.mongodb.net/messages?retryWrites=true&w=majority'
  )
  .then(result => {
      console.log('connected!')
      app.listen(3000);

   
  })
  .catch(err => console.log(err));

