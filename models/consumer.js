const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Application Status Help 

// 0 -> Not Approved
// 1 -> Approved 
// 2 -> Completed
// -1 -> Rejected

// Consumer SCHEMA
const consumerSchema = new Schema({
    //Array of Object for New Application
    "submitted": mongoose.Schema.Types.ObjectId,
    "ApplicationID": {
        type: String,
        unique: true
    },
    "status": {
        type: Number,
        default: 0
    },
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
    "transferApplication": {
        "transferringToName": String,
        "newOwnerAadharNumber": Number,
        "address": String,
        "isTransferCompleted": Boolean
    },
    "closureOfConnection": {
        "lastBillNumber": Number,
        "lastBillAmount": Number,
        "reasonOfClosure": String,
        "isClosureApproved": Boolean
    },
    "tracking": {
        "lineman": {
            "allotted": Boolean,
            "id": mongoose.Schema.Types.ObjectId,
            "status": {
                type: Number,
                default: 0
            },
            "completed": Boolean
        },
        "verification": {
            "user": Boolean,
            "finance": Boolean,
            "availability": Boolean,
            "ifCancelReason": String
        }
    }
});

module.exports = mongoose.model('consumer', consumerSchema);
