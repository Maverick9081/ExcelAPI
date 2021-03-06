import mongoose from "mongoose";
const Schema = mongoose.Schema


// const dataSchema = new Schema({ any: [{}] });

// const dataSchema = new Schema({
//     json: Object
    
// })

const excelDataSchema = new Schema({
   
DATE :{
    type: String,
  
},
MODE :{
    type: String,
  
},
LOCATION :{
    type: String,
    
},
DATE :{
    type: String,
    
},
CUSTOMER :{
    type: String,
    
},
'PRODUCT CODE' :{
    type: String,
    
},
SOURCE :{
    type: String,
    
},
RAILCAR :{
    type: String,
    
},
FLEET :{
    type: String,
    
},
SUBFLEET:{
    type: String,
    
},
'RAILCAR SEALS' :{
    type: String,
    
},
BOL :{
    type: String,
    
},
'TERMINAL / DESTINATION' :{
    type: String,
    
},
CITY:{
    type: String,
    
},
STATE :{
    type: String,
    
},
'WEIGHT\n(kg)' :{
    type: String,
    
},
'TEMPERATURE\n(C)' :{
    type: String,
    
},
'DENSITY\n(kg/m3 @ 15C)' :{
    type: String,
    
},
 'S&W %' :{
    type: String,
    
},
'S&W\n(BBL @ 15C)' :{
    type: String,
    
},

'NET OIL\n(BBL @ 15C)' :{
    type: String,
    
},
'TOTAL VOL\n(BBL @ 15C)':{
    type: String,
    
},
'S&W\n(m3 @ 15C)':{
    type: String,
    
},
'NET OIL\n(m3 @ 15C)':{
    type: String,
    
},
'TOTAL VOL\n(m3 @ 15C)':{
    type: String,
    
},
'BOL DATE':{
    type: String,
    
},
'HEEL VOLUME\n(m3 @ 15C)':{
    type: String,
    
},
'HEEL WEIGHT\n(kg)':{
    type: String,  
},
'Contract Id':{
    type: String,  
}

});

export default mongoose.model('Data',excelDataSchema );
