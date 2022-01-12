import mongoose from "mongoose";
import xlsx from "xlsx";
import excelDataSchema  from "../model/data.js";
import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const redirectURI = process.env.redirectURI;
const refreshToken = process.env.refreshToken;

const oAuth2Client = new google.auth.
OAuth2(
        clientId,
        clientSecret,
        redirectURI
        )

oAuth2Client.setCredentials({refresh_token: refreshToken})



const drive = google
.drive({

        version: 'v3',
        auth: oAuth2Client
 
        });

const scopes = [ 'https://www.googleapis.com/auth/drive'];

async function uploadFile(file) {
    try{
         const response = await drive.files
         .create({
                    requestBody:
                     {
                      name: Date.now().toString() + 'file.xlsx',
                       mimeType: 'excel/xlsx',
                     },
                    media: 
                    {
                         mimeType: 'excel/xlsx',
                         body: fs.createReadStream(file)
                    },
                    scope: scopes
                 });  
      
          console.log(response.data);
        }
    catch (error) {

        console.log(error.message);
    }
}  




let data;
export const upload = (req,res,next) => 
{
    let path;
    if(!( path = req.file)) 
        {
         throw new Error('invalid file or File not uploaded')
        }
    uploadFile(req.file.path);
    data = xlsx.readFile(req.file.path)
    const as = data.SheetNames
    const len = as.length
    excelDataSchema.deleteMany({})
    .then(result => 
        {
            console.log(result);
        })
    if(len == 0) 
        {
            throw new Error('invalid Document')
        }
    let i;
    for(i=0 ; i<len; i++) 
    {

        const bs = as[i];
        const ws = data.Sheets[bs]
        const Data = xlsx.utils.sheet_to_json(ws)
        excelDataSchema.insertMany(Data,(err,data)=>
            {  
                if(err)
                    {  
                        console.log(err);  
                    }
    
            });
  
    }
    res.send('file uploaded successfully'); 
}

