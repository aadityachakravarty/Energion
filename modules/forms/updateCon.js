const mongoose = require('mongoose')

const Consumer = require(__base + 'models/consumer.js').consumer

const updateCon = (req, res) => {
    if (req.body.applicationID) {
        if (req.body.applicantName) {
            Consumer.findOneAndUpdate({ "ApplicationID": req.body.applicationID }, {
                "consumerDetails.applicantName": req.body.applicantName
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                else {
                    if (!data) {
                        res.status(404).json({ message: "no Entry Found" });
                    }

                    else {
                        data.save((err, updatedData) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send("Update failed");
                            }
                            else {
                                Consumer.findOne({ "ApplicationID": updatedData.ApplicationID }, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        res.status(500).json(err);
                                    }
                                    else {
                                        res.status(200).json(data);
                                    }
                                })
                            }
                        });
                    }// nested else finish
                }
            });
        }
        else if (req.body.newLoad) {
            Consumer.findOneAndUpdate({ "ApplicationID": req.body.applicationID }, {
                "consumerDetails.loadDemand": req.body.newLoad
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                else {
                    if (!data) {
                        res.status(404).json({ message: "no Entry Found" });
                    }

                    else {
                        data.save((err, updatedData) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send("Update failed");
                            }
                            else {
                                Consumer.findOne({ "ApplicationID": updatedData.ApplicationID }, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        res.status(500).json(err);
                                    }
                                    else {
                                        res.status(200).json(data);
                                    }
                                })
                            }
                        });
                    }// nested else finish
                }
            });
        }
    }

}

module.exports = updateCon
