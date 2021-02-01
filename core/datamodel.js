exports = {
    guildSettings: {

    },
    users: {
        id: { type: String, default: null },
        createdAt: { type: Number, default: Date.now() },
        logged: { type: Boolean, default: false }
    },
    members: {
        "id": "",
        "userId": "",
        "guildId": "",
        "createdAt": 0
    },
    guilds: {
        "id": "",
        "createdAt": 0
    },
    games: {
        "id": "",
        "name": "",
        "presence": "",
        "aliases": [],
        "emoji": "",
        "createdAt": 0
    },
    guildGames: {
        "id": "",
        "guildId": "",
        "gameId": "",
        "createdAt": 0
    }
}