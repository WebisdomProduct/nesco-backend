const AWS = require('aws-sdk');
require('dotenv').config();

module.exports = new AWS.S3({
  accessKeyId: process.env.IM_AWS_ACCESS_KEY,
  signatureVersion: 'v4',
  region: 'ap-south-1',
  secretAccessKey: process.env.IM_AWS_SECRET_KEY,
});
