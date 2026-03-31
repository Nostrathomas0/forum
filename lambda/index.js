// lambda/index.js
require('dotenv').config();
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: process.env.AWS_BUCKET_REGION });

// Import handlers
const { handler: discordHandler } = require('./discord-endpoint');
const { handler: gameHandler } = require('./game-handler');

exports.handler = async (event) => {
  console.log('Incoming request:', event.path || event.rawPath);
  
  const path = event.path || event.rawPath;
  
  // Route Discord requests
  if (path.includes('/discord')) {
    return discordHandler(event);
  }
  
  // Route game requests
  if (path.startsWith('/game/')) {
    return gameHandler(event);
  }
  
  // Default
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      message: 'Languapps Forum API',
      endpoints: { discord: '/discord', game: '/game/*' }
    })
  };
};