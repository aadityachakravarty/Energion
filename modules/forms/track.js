const mongoose = require('mongoose')

const Consumer = require(__base + 'models/consumer.js').consumer

const track = (req, res) => {
    Consumer.findOne({ "ApplicationID": req.body.applicationId }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            res.send(data);
        }
    });
}

module.exports = track
