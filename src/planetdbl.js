const axios = require('axios');

class Planetdbl {
  constructor() {
    this.botToken = null;
    this.guildCount = null;
    this.shardCount = null;
    this.errorType = 'console'; // Default to console
    this.messageHandler = null;
  }

  setup({ botToken, guildCount, shardCount, errorType = 'console', messageHandler }) {
    if (!botToken || !guildCount || !shardCount) {
      this.handleError('Please provide valid botToken, guildCount, and shardCount.', {}, errorType);
      return;
    }

    if (!this.isValidToken(botToken)) {
      this.handleError('Invalid Token of the DBL Bot provided.', {}, errorType, 'setup');
      return;
    }

    this.botToken = botToken;
    this.guildCount = guildCount;
    this.shardCount = shardCount;
    this.errorType = errorType;
    this.messageHandler = messageHandler;

    this.updateBotStats();
    setInterval(() => this.updateBotStats(), 1800000); // Update every 30 minutes
  }

  async updateBotStats() {
    try {
      const response = await axios.post('https://api.planetdbl.xyz/v1/bots/stats', {
        headers: {
          Authorization: this.botToken,
          serverCount: this.guildCount,
          shardCount: this.shardCount,
        },
      });

      console.log('Bot stats updated successfully:', response.data);
    } catch (error) {
      this.handleError('Error updating bot stats:', error, this.errorType, 'updateBotStats');
    }
  }

  async checkVote(userID) {
    try {
      const response = await axios.get(`https://api.planetdbl.xyz/v1/bots/check/${userID}`, {
        headers: {
          Authorization: this.botToken,
        },
      });

      return response.data.voted;
    } catch (error) {
      this.handleError('Error checking vote:', error, this.errorType, 'checkVote');
      return false;
    }
  }

  async getBotInfo(botID) {
    try {
      const response = await axios.get(`https://api.planetdbl.xyz/v1/bots/${botID}`);

      return response.data;
    } catch (error) {
      this.handleError('Error getting bot info:', error.message);
      return null;
    }
  }

  async searchServer(key) {
    try {
      const response = await axios.post('https://api.planetdbl.xyz/v1/server/search', {
        key,
      });

      return response.data;
    } catch (error) {
      this.handleError('Error searching servers:', error.message);
      return [];
    }
  }

  async searchBot(key) {
    try {
      const response = await axios.post('https://api.planetdbl.xyz/v1/bots/search', {
        key,
      });

      return response.data;
    } catch (error) {
      this.handleError('Error searching bots:', error.message);
      return [];
    }
  }

  isValidToken(token) {
    return typeof token === 'string' && token.length > 20;
  }

  handleError(message, error, errorType, functionName) {
    const codeLine = (new Error()).stack.split('\n')[2].trim();
    const formattedMessage = `planetdbl.xyz Error: ${message} <${functionName}:${codeLine}>`;

    if (errorType === 'console') {
      console.error(formattedMessage);
    } else if (errorType === 'message') {
      if (typeof this.messageHandler === 'function') {
        this.messageHandler(formattedMessage);
      } else {
        console.error('Message handler function is not provided.');
      }
    } else {
      console.error('Invalid errorType. Supported types are "console" and "message".');
    }
  }
}

module.exports = {
  Planetdbl,
};
