const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

exports.verifyGoogleToken = async (token, allowedClientIds) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: allowedClientIds
    });
    return ticket.getPayload(); // contains email, uid, etc.
  } catch {
    return null;
  }
};