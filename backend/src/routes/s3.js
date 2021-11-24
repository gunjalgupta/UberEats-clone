require('dotenv').config()
const fs = require('fs')
var AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: process.env.region,
  accessKeyId : process.env.accessKeyId,
  secretAccessKey :process.env.secretAccessKey})
//const S3 = require('aws-sdk/clients/s3')
const { ADDRGETNETWORKPARAMS } = require('dns')

const bucketName = process.env.bucketName



// uploads a file to s3
function uploadFile(file) {
  console.log("HELLO",file);
  const fileStream = fs.createReadStream(file.path)
  console.log("HELLO2");
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
    console.log("Inside the function")
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream;