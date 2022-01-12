import express  from "express";
import multer from "multer";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import { uploadRoutes } from "./routes/upload.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const mongodbURI = process.env.mongodbURI



const fileStorage = multer.diskStorage
  ({
    destination: (req,file,cb) => 
     {
        cb(null,'./excel');
     },
    filename: (req,file,cb) => 
      {
        cb(null,  Date.now() +' ' + file.originalname)
      }
  })

const fileFilter =(res, file, cb) =>
  {
    if(!file.originalname.match(/\.(xls|xlsx)$/))
     {
      return cb(new Error('Please upload a excel file'));
     }
    cb(undefined, true)
  }
const upload =multer({storage: fileStorage, fileFilter: fileFilter }).single("file");
 

app.use('/excel', express.static(path.join(__dirname, 'excel')));

app.use(upload);

app.use(bodyParser.json());

app.use(uploadRoutes);


mongoose
  .connect(mongodbURI)
  .then(result => 
    {
      console.log('connected!')
      app.listen(3000);

   
    })
  .catch(err => console.log(err));

