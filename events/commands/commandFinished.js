const { Listener } = require('discord-akairo');

class CommandFinishedListener extends Listener {
	constructor() {
		super('commandFinished', {
			event: 'commandFinished',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	exec(message, command) {
        const origin = message.guild ? `${message.guild.name}/${message.author.tag}` : `Message Privé/${message.author.tag}`;
        this.client.logger.cmd(`${origin} => ${command.id}`);
	}
}

module.exports = CommandFinishedListener;