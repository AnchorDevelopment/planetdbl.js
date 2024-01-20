
# planetdbl.js
A library for interacting with the Planetdbl.xyz API.

## Installation

You can install `planetdbl.js` using npm:

```bash
npm install planetdbl.js
```
# Getting Started
To use planetdbl.js in your project, follow these steps:

**Install the library:**
```bash
npm install planetdbl.js
```
**Require in your main file:**
```javascript
const { Planetdbl } = require('planetdbl.js');
const planetdbl = new Planetdbl();



planetdbl.setup({
  botToken: 'YOUR_DBL_BOT_TOKEN', //Your dbl token.
  guildCount: 1000,
  shardCount: 1,
  errorType: 'console', // or 'message'
 messageHandler: yourCustomMessageHandlerFunction // optional, Remove it If you dont want!
});
```
## Examples:
```js
// Example: Update bot stats
planetdbl.updateBotStats();

// Example: Check if a user has voted
const voted = await planetdbl.checkVote('USER_ID');
console.log('Has voted:', voted);
```
# Configuration Options
`botToken`: Your planetdbl.xyz dbl token.
`guildCount`: The number of guilds your bot is in.
`shardCount`: The number of shards your bot has.
`errorType`: Type of error handling ('console' or 'message').
`messageHandler`: Custom function to handle error messages (optional).

# Methods
`updateBotStats()`: Updates bot statistics.
`checkVote(userID)`: Checks if a user has voted.
`getBotInfo(botID)`: Gets information about a bot.
`searchServer(key)`: Searches for servers.
`searchBot(key)`: Searches for bots.

