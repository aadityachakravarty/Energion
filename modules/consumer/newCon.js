const Consumer = require(__base + 'models/consumer.js');

const rand = require(__base + 'modules/misc/rand');

const newCon = (req, res) => {
    let newApplication = new Consumer({
        "submitted": req.info.id,
        "ApplicationID": rand({ limit: 14, special: false }),
        "consumerDetails": {
            "applicantName": req.body.applicantName,
            "father_husbandName": req.body.nominee,
            "connectionAddress": req.body.connectionAddress,
            "contactNumber": req.body.applicantPhone,
            "emailAddress": req.body.applicantEmail,
            "permanentAddress": req.body.permanentAddress,
            "aadharNumber": req.body.aadharNum,
            "connectionCategory": req.body.connectionCategory,
            "connectionType": req.body.connectionType,
            "loadDemand": req.body.loadDemand,
            "voltageSupply": req.body.voltageSupply,
            "statusOfApplication": false
        },
        "tracking": {
            "lineman": {
                "allotted": false,
                "status": 0
            },
            "verification": {
                "user": false,
                "finance": false,
                "availability": false
            }
        }
    })
    newApplication.save((error) => {
        if (error) {
            res.json({
                success: false,
                msg: error.message
            });
        }
        else {
            res.json({
                success: true,
                msg: "New connection request added successfully"
            });
        }
    });
}

module.exports = newCon
