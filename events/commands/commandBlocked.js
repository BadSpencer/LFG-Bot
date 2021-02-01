const { Listener } = require('discord-akairo');


class CommandBlockedListener extends Listener {
	constructor() {
		super('commandBlocked', {
			event: 'commandBlocked',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	exec(message, command, reason) {
		const text = {
			owner: () => 'You must be the owner to use this command.',
			guild: () => 'You must be in a guild to use this command.'
		}[reason];

        const origin = message.guild ? `${message.guild.name}/${message.author.tag}` : `Message Privé/${message.author.tag}`;
        this.client.logger.cmdblck(`${origin} => ${command.id} : ${reason}`);

		if (!text) return;
		if (message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true) {
			message.reply(text());
		}
	}
}

module.exports = CommandBlockedListener;