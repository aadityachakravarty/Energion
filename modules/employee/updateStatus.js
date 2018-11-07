const mongoose = require("mongoose")

const appStatus = require('../../models/appStatus')

const consumer = require('../../models/consumer')

const updateStatus = (req, res) => {
    if (req.body.applicationId) {
        if (req.body.userType == 'v') {
            let verify = new appStatus({
                "ApplicationID": req.body.applicationId,
                "verification": {
                    "status": req.body.status
                },
                "finance": {
                    "status": false
                },
                "technical": {
                    "status": false
                }
            })
            verify.save((error) => {
                if (error) {
                    res.send(error)
                }
                else {
                    verify.findOne({ "ApplicationID": req.body.applicationId }, (err, data) => {
                        if (err) {
                            console.log(err)
                            res.send(err)
                        }
                        else {
                            res.send(data)
                        }
                    })
                }
            })
            consumer.findOneAndUpdate({ "ApplicationID": req.body.applicationId }, {
                $set: {
                    "applicationTracking": {
                        "veriFinance": req.body.status
                    }
                }
            })
            if(!req.body.status){
                consumer.findOneAndUpdate({ "ApplicationID": req.body.applicationId }, {
                    $set: {
                        "applicationTracking": {
                            "veriErr": true
                        }
                    }
                })
            }
            else{
                consumer.findOneAndUpdate({ "ApplicationID": req.body.applicationId }, {
                    $set: {
                        "applicationTracking": {
                            "veriErr": false
                        }
                    }
                })
            }
        }
        else if (req.body.userType == 't') {
            appStatus.findOneAndUpdate({ "ApplicationID": req.body.applicationId }, {
                $set: {
                    "technical": {
                        "status": req.body.status
                    }
                }
            })
        }
        else {
            console.log("Wrong Employee Type!")
            res.send("Wrong Employee Type!")
        }
    }
    else {
        console.log("No Application ID specified!")
        res.send("No Application ID specified!")
    }
}

module.exports = updateStatus;