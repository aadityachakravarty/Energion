const mongoose = require('mongoose')

const Consumer = require(__base + 'models/consumer.js').consumer

const applications = (req,res) => {
  Consumer.find({}, (err,data) => {
    if(err){
      console.log(err);
      res.status(500).json(err);
    }
    else {
        res.send(data);
    }
  });
}

module.exports = applications
