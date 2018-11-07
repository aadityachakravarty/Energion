const mongoose = require('mongoose')

const Consumer = require(__base  + 'models/consumer.js').consumer

const stat = require(__base + 'modules/misc/rand.js').static

const newCon = (req,res) => {
        let newApplication = new Consumer({
          "ApplicationID":stat(11),
          "status":"new",
          "consumerDetails":
              {
                  "applicantName": req.body.applicantName,
                  "father_husbandName": req.body.fatherhusbandName,
                  "connectionAddress": req.body.connectionAddress,
                  "contactNumber": req.body.contactNumber,
                  "emailAddress": req.body.email,
                  "permanentAddress": req.body.permanentAddress,
                  "aadharNumber": req.body.aadharNumber,
                  "connectionCategory": req.body.connectionCategory,
                  "connectionType": req.body.connectionType,
                  "loadDemand": req.body.loadDemand,
                  "voltageSupply": req.body.voltageSupply,
                  "statusOfApplication": false
              },
              "applicationTracking": {
                  "userSubmitted": true,
                  "veriFinance": false,
                  "veriFinErr": false,
                  "techPro": false,
                  "emPro": false,
                  "completed": false
              }
          })
        newApplication.save((error) => {
          if (error) {
            res.send(error);
          }
          else {
            res.status(200).json({
              "Status" : "New connection added successfully",
              "Application" : newApplication,
            });
            console.log('consumer application saved!');
        }
    });
}

module.exports = newCon
