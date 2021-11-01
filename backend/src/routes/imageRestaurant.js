const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

    const fs = require('fs')
    const util = require('util')
    const unlinkFile = util.promisify(fs.unlink)
    const Restaurant = require('../models/restaurant');

    const multer = require('multer')
    const upload = multer({ dest: 'uploads/' })

    const {uploadFile, getFileStream} = require('./s3.js')
    //const { checkToken } = require('../middleware/auth.js')
    
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
        await unlinkFile(file.path)
        console.log(result)
        const key = result.Key
        const restaurantId = req.body.restaurantId
        console.log("key restaurantId", restaurantId,key)
        //const customerId = req.body.customerId
        req.body.path = "resimage";
	    //req.body.customerId= customerId;
	    req.body.key= key;

	    kafka.make_request("rsignup", req.body, (err,result) => {
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
    })
  })
      module.exports= router;