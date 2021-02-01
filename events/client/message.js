const {
    Listener
} = require("discord-akairo");

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

  async exec(message) {
        if (message.author.bot) return;

        // message.settings = client.getSettings();
    }
}

module.exports = MessageListener;