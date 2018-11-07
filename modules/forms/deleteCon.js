const mongoose = require('mongoose')

const Consumer = require(__base + 'models/consumer.js').consumer
const History = require(__base + 'models/consumer.js').history

const deleteCon = (req,res) => {
  let updateOps = {}
  for (let key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Consumer.findOne({"ApplicationID":req.body.applicationID}, (err,data) => {
    if(err){
      console.log(err);
      res.status(500).json(err);
    }
    else {
      if(!data){
        res.status(404).json({message:"no Entry Found"});
      }

      else {
        let logApplication = new History(data)
        logApplication.save((error) => {
          if (error) {
            console.log(logApplication)
            res.send(error);
          }
          else {
            res.status(200).json({
              "Status" : "Connection deleted successfully."
            });
          }
        })
      }
    }
  })
}

module.exports = deleteCon
