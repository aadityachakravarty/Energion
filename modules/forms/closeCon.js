const mongoose = require('mongoose')

const Consumer = require(__base + 'models/consumer.js').consumer

const closureCon = (req,res) => {
  Consumer.findOneAndUpdate({"ApplicationID":req.body.applicationID},{
      $set:{
        "closureOfConnection" : {
                "lastBillNumber" : req.body.billNumber,
                "lastBillAmount" : req.body.billAmount,
                "reasonOfClosure" : req.body.reason,
                "isClosureApproved" : false
        }
      },
    }, (err,data) => {
    if(err){
      console.log(err);
      res.status(500).json(err);
    }
    else {
      if(!data){
        res.status(404).json({message:"no Entry Found"});
      }

      else {
        data.save((err,updatedData)=>{
          Consumer.findOne({"ApplicationID":req.body.applicationID}, (err, data) => {
            if(err){
              console.log(err)
              res.status(500).send(err)
            }
            else{
              res.status(200).json(data)
            }
          })
        });
      }// nested else finish
    }
  });
}

module.exports = closureCon
