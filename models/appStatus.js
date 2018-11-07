const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const appStatus = new Schema({
    "ApplicationID":String,
    "verification":{
        "status":Boolean
    },
    "finance":{
        "status":Boolean
    },
    "technical":{
        "status":Boolean
    }
});
module.exports=mongoose.model('appStatus',appStatus);
