const mongoose=require('mongoose');
const Schema = mongoose.Schema;
// Consumer SCHEMA
 const consumerSchema = new Schema({
     //Array of Object for New Application
     "ApplicationID":{
         "type":String,
         "required":true,
         "unique":true
       },
       "status":String,
     "consumerDetails":
         {
             "applicantName": String,
             "father_husbandName": String,
             "connectionAddress": String,
             "contactNumber": String,
             "emailAddress": String,
             "permanentAddress": String,
             "aadharNumber": Number,
             "connectionCategory": String,
             "connectionType": String,
             "loadDemand": String,
             "voltageSupply": String,
             "meterNumber": String,
             "statusOfApplication": Boolean,
             "docUrl": String
         },
      "transferApplication" : {
          "transferringToName" : String,
          "newOwnerAadharNumber" : Number,
          "address" : String,
          "isTransferCompleted" : Boolean
      },
      "closureOfConnection" : {
            "lastBillNumber" : Number,
            "lastBillAmount" : Number,
            "reasonOfClosure" : String,
            "isClosureApproved" : Boolean
      },
      "applicationTracking": {
          "userSubmitted": Boolean,
          "veriFinance": Boolean,
          "veriErr": Boolean,
          "techPro": Boolean,
          "emPro": Boolean,
          "completed": Boolean,
          "num":0
      }
})

module.exports.consumer = mongoose.model('consumer',consumerSchema);
module.exports.history = mongoose.model('history',consumerSchema);
