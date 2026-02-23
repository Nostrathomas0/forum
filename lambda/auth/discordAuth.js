const fetch = require('node-fetch');

exports.exchangeDiscordToken = async (code, email) => {
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code
    })
  });
  return response.json();
};
```

You'll also need to add to `.env`:
```
DISCORD_CLIENT_ID=1475601779411386399
DISCORD_CLIENT_SECRET=Jx14FAQddOdeXI6QKR0PAus0q_9DUoit