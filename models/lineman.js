const mongoose=require('mongoose');
const Schema=mongoose.Schema;



// Line Man

const lineManSchema = new Schema({

    isTaskCompleted : String,
    otpOfCompletion : Number

});
module.exports=mongoose.model("lineman",lineManSchema);
