//require('dotenv').config()
const fs = require('fs')
var AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId : "AKIAYJE6TRDKZWQTAMH2",
  secretAccessKey :"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"})
//const S3 = require('aws-sdk/clients/s3')
const { ADDRGETNETWORKPARAMS } = require('dns')

const bucketName = "imagesmenu"
const region = "us-east-1"
const accessKeyId = "AKIAYJE6TRDKZWQTAMH2"
const secretAccessKey = "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"

// const S3 = new s3({
//   region,
//   accessKeyId,
//   secretAccessKey
// })

// uploads a file to s3
function uploadFile(file) {
  console.log("HELLO");
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