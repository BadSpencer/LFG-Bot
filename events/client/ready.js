const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        const pjson = require('../../package.json');

        let activities = [];
        activities.push(
            { text: () => `${this.client.guilds.cache.size} serveurs`, type: 'WATCHING' },
            // { text: () => `with ${formatNumber(client.registry.commands.size)} commands`, type: 'PLAYING' },
            { text: () => `${this.client.channels.cache.size} salons`, type: 'WATCHING' }
        );

        this.client.setInterval(() => {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            const text = typeof activity.text === 'function' ? activity.text() : activity.text;
            this.client.user.setActivity(text, { type: activity.type });
        }, 60000);

        this.client.logger.info(`${this.client.user.tag} v${pjson.version}`);

        if(this.client.config.site.enabled) {
            // this.client.dashboard.load(this.client);
            this.client.website.load(this.client);
        }

    }
}

module.exports = ReadyListener;