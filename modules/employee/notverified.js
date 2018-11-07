const mongoose = require('mongoose')

const Consumer = require(__base + 'models/consumer.js').consumer

const notverified = (req, res) => {
    Consumer.findOne({ "ApplicationID": req.body.applicationId }, (err, data) => {
        if (err) console.log(err)

        else {
            if ((data.applicationTracking.num < 6) && (data.applicationTracking.num > 0)) {
                Consumer.findOneAndUpdate({ "ApplicationID": req.body.applicationId }, {
                    $set: {
                        "applicationTracking":
                            {
                                "num": data.applicationTracking.num - 1
                            }
                    },
                }, (err, data) => {
                    if (err) console.log(err)

                    else {
                        Consumer.findOne({ "ApplicationID": req.body.applicationId }, (err, data) => {
                            if (err) console.log(err)

                            else {
                                res.send(data)
                            }
                        })
                    }
                })
            }
        }
    })
}

module.exports = notverified
