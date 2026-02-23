// lambda/index.js
require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({ region: process.env.AWS_BUCKET_REGION });

const { handler: discordHandler } = require('./discord-endpoint');

exports.handler = async (event) => {
  // Route incoming requests
  const path = event.path || event.rawPath;

  if (path.includes('/discord')) {
    return discordHandler(event);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Languapps Forum API' })
  };
};