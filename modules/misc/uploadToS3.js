var AWS = require('aws-sdk');

AWS.config.update({ 
    "accessKeyId": "AKIAIZPFUWGH7KR6T4MA",
    "secretAccessKey": "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", 
    "region": "ap-south-1" 
})

var s3 = new AWS.S3();

// Bucket names must be unique across all S3 users

var myBucket = 'sih-2018';



const uploadToS3 = (data, extn) => {
    var myKey = new Date().toISOString() + extn;
    params = { Bucket: myBucket, Key: myKey, Body: data };

    s3.putObject(params, function (err, data) {

        if (err) {

            console.log(err)

        } else {

            console.log("Successfully uploaded data to myBucket/myKey");
            console.log(data);

        }

    });
    return myKey;
}

module.exports = uploadToS3;
