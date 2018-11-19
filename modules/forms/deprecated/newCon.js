router.post('/uploadDoc',upload.single('documentImage'),(req,res)=>{
    //     extn = path.extname(req.file.path)
    //     fs.readFile(req.file.path, function(err, data){
    //         if(err) console.log(err)
    
    //         else{
    //             url = "https://s3.ap-south-1.amazonaws.com/sih-2018/" + require('../modules/misc/uploadToS3')(data, extn)
    //             consumer.findOneAndUpdate({"ApplicationID":req.body.applicationId}, {
    //                 $set:{
    //                     "consumerDetails":{
    //                         "docUrl":url
    //                     }
    //                 }
    //             })
    //             res.send(url)
    //         }
    //     })
    // });