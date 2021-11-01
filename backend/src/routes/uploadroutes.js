const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

    const fs = require('fs')
    const util = require('util')
    const unlinkFile = util.promisify(fs.unlink)
    const Customer = require('../models/customer');

    const multer = require('multer')
    const upload = multer({ dest: 'uploads/' })

    const {uploadFile, getFileStream} = require('./s3.js')
    //const { checkToken } = require('../middleware/auth.js')

    // addpicture = function (customerId, key, res) {
    //     console.log("model",key);
    //     req={}
    //     req.body={}
    //     req.body.path = "cusimage";
	//     req.body.customerId= customerId;
	//     req.body.key= key;

	//     kafka.make_request("csignup", req.body, (err,result) => {
	// 	if (result === 500) {
	// 		res.writeHead(500, {
	// 			"Content-Type": "text/plain",
	// 		});
	// 		res.end("SERVER_ERROR");
	// 	} 
	// 	else {
	// 		res.writeHead(200, {
	// 			"Content-Type": "text/plain",
	// 		});
	// 		res.end(JSON.stringify(result));
	// 	}
	// });
       
    //   }
    
      router.get('/api/images/:key', (req, res) => {
      console.log("++++++",req.params)
      const key = req.params.key
      const readStream = getFileStream(key)
    
      readStream.pipe(res)
    })
      
      router.post('/api/images', upload.single('image'), async (req, res) => {
        const file = req.file
        console.log("++++++",file)
        console.log("Here inside routes")
        const result = await uploadFile(file)
        console.log("Hello");
        await unlinkFile(file.path)
        console.log("Hello");
        console.log(result)
        const key = result.Key
        //const customerId = req.body.customerId
        req.body.path = "cusimage";
	    //req.body.customerId= customerId;
	    req.body.key= key;

	    kafka.make_request("csignup", req.body, (err,result) => {
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} 
		else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
        // console.log("key customerId", customerId,key)
        // addpicture(req.body.customerId, result.Key, (err,data) => {
        //   if(err) {
        //     res.status(500).send({
        //       message : err.message
        //     })
        //   }
        //   else {
        //     console.log("----",data)
        //     res.json({
        //       message: "Image uploaded"
        //     })
        //   }
        // })
      }) 


      module.exports = router;