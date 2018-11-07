const mongoose = require('mongoose')

const Consumer = require(__base + 'models/consumer.js').consumer

const myCon = (req,res) => {
  Consumer.find({"consumerDetails.emailAddress":req.body.email}, (err,data) => {
    if(err){
      console.log(err);
      res.status(500).json(err);
    }
    else {
        res.send(data);
    }
  });
}

module.exports = myCon
