const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const auth = require(__base + 'modules/auth/protect.js')
const path = require('path')
const consumer = require('../models/consumer').consumer
const storage=multer.diskStorage({
    destination:'./uploads/',
    filename:(req,file,cb)=>{
      cb(null,new Date().toISOString()+ file.originalname);
    }
  });
  
const upload=multer({storage: storage});

//Saving New Application Data In mongoosegoDb
router.post('/new', auth, require(__base + 'modules/forms/newCon.js'))

//My connections
router.post('/mycon', auth, require('../modules/forms/myCon'))

//Update Connection
router.post('/update', auth, require('../modules/forms/updateCon'))

//Track Connection
router.post('/track', auth, require('../modules/forms/track'))

//testing part
router.put('/transfer', auth, require(__base + 'modules/forms/transferCon.js'))

//for closure of connection
router.patch('/closure', auth, require(__base + 'modules/forms/closeCon.js'))

//for deleting connection
router.delete('/delete', auth, require(__base + 'modules/forms/deleteCon.js'))

router.post('/uploadDoc',upload.single('documentImage'),(req,res)=>{
    extn = path.extname(req.file.path)
    fs.readFile(req.file.path, function(err, data){
        if(err) console.log(err)

        else{
            url = "https://s3.ap-south-1.amazonaws.com/sih-2018/" + require('../modules/misc/uploadToS3')(data, extn)
            consumer.findOneAndUpdate({"ApplicationID":req.body.applicationId}, {
                $set:{
                    "consumerDetails":{
                        "docUrl":url
                    }
                }
            })
            res.send(url)
        }
    })
});

module.exports = router;
