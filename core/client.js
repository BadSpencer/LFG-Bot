const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require("discord-akairo");
const Enmap = require("enmap");
const Config = require("../config");



class Client extends AkairoClient {
	constructor() {
		super({ ownerID: Config.owner }, {
			messageCacheMaxSize: 500,
			messageCacheLifetime: 10800,
			messageSweepInterval: 21600,
			disableEveryone: true,
			disabledEvents: ['TYPING_START'],
			partials: ['MESSAGE']
		});

		this.commandHandler = new CommandHandler(this, {
			directory: "./commands/",
			aliasReplacement: /-/g,
			prefix: Config.prefix,
			allowMention: true,
			fetchMembers: true,
			commandUtil: true,
			commandUtilLifetime: 3e5,
			commandUtilSweepInterval: 9e5,
			handleEdits: true,
			defaultCooldown: 2500,
			argumentDefaults: {
				prompt: {
					cancelWord: 'stop',
					timeout: msg => `Vous avez mis trop de temps à répondre. Commande annulée`,
					ended: msg => `Trop de tentatives. Commande annulée`,
					cancel: msg => `Commande annulée`,
					retries: 4,
					time: 60000
				}
			}
		});



		this.db = {}
		this.db.guildSettings = new Enmap({
			name: "guildSettings",
			fetchAll: false,
			autoFetch: true,
			cloneLevel: 'deep'
		});
		this.db.users = new Enmap({
			name: "users",
			fetchAll: false,
			autoFetch: true,
			cloneLevel: 'deep'
		});
		this.db.members = new Enmap({
			name: "members",
			fetchAll: false,
			autoFetch: true,
			cloneLevel: 'deep'
		});
		this.db.guilds = new Enmap({
			name: "guilds",
			fetchAll: false,
			autoFetch: true,
			cloneLevel: 'deep'
		});
		this.db.games = new Enmap({
			name: "games",
			fetchAll: false,
			autoFetch: true,
			cloneLevel: 'deep'
		});
		this.db.guildGames = new Enmap({
			name: "guildGames",
			fetchAll: false,
			autoFetch: true,
			cloneLevel: 'deep'
		});

		this.config = Config;
		this.logger = require('./logger');
		this.dashboard = require("../dashboard/app");
		this.website = require("../website/dashboard.js");
		this.datamodel = require("./datamodel");
		this.functions = require("./functions");

		this.states = {};

		

		this.inhibitorHandler = new InhibitorHandler(this, { directory: './inhibitors' });
		this.listenerHandler = new ListenerHandler(this, { directory: "./events/" });

		this.setup();


	}

	setup() {
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler
		});

		this.commandHandler.loadAll();
		this.inhibitorHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	async start() {
		return this.login(Config.token);
	}
}

module.exports = Client;