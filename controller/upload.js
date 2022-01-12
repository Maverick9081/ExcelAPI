const { Mongoose } = require('mongoose');
const xlsx = require('xlsx');
const DATA = require('../model/data');
const { google } = require('googleapis');
const fs = require('fs');
const { json } = require('body-parser');
require('dotenv').config();

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const redirectURI = process.env.redirectURI;
const refreshToken = process.env.refreshToken;

const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
   redirectURI
)

oAuth2Client.setCredentials({refresh_token: refreshToken})



const drive = google.drive({
    version: 'v3',
    auth: oAuth2Client
 
})
const scopes = [
    'https://www.googleapis.com/auth/drive']

async function uploadFile(file) {
    try{
      const response = await drive.files.create({
            requestBody: {
                name: Date.now().toString() + 'file.xlsx',
                mimeType: 'excel/xlsx',
            },
            media: {
                mimeType: 'excel/xlsx',
                body: fs.createReadStream(file)
            },
            scope: scopes
        });  
      
        console.log(response.data);
    }catch (error) {

        console.log(error.message);
    }
}  




let data;

exports.upload = (req,res,next) => {
    let path;
    if(!( path = req.file)) {
        throw new Error('invalid file or File not uploaded')
    }
uploadFile(req.file.path);
 data = xlsx.readFile(req.file.path)
const as = data.SheetNames
const len = as.length

if(len == 0) {
    throw new Error('invalid Document')
}
for(i=0 ; i<len; i++) {

    const bs = as[i];

//  const ws = data.Sheets["CUS OUTBOUND RAW DATA"]
const ws = data.Sheets[bs]
 const Data = xlsx.utils.sheet_to_json(ws)



 DATA.insertMany(Data,(err,data)=>{  
    if(err){  
    console.log(err);  
    }
    
    });
  
}
res.send('file uploaded successfully'); 
}
