const { Listener } = require('discord-akairo');

class CommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			event: 'commandStarted',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	exec(message, command) {

	}
}

module.exports = CommandStartedListener;