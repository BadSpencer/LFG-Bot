module.exports = {

	owner: "XXXXXXXXXXX", 	// ID du propriétaire du Bot
	token: "XXXXXXXXXXX", 	// Token du Bot à retrouver sur https://discord.com/developers/applications
	prefix: "$", 			// Préfixe par défaut


	site: {
		enabled: false, 					// Site web actif ?
		secret: "XXXXXXXXXXX", 				// Client secret à retrouver sur https://discord.com/developers/applications
		baseURL: "https://my.url.com", 		// URL du site
		port: 8080, 						// Port du site
		sessionSecret: "XXXXXXXXXXX", 		// Phrase secrète (ce que vous voulez) pour Express session 
		failureURL: "https://my.url.com" 	// URL où seront redirigés les visiteurs qui annuleront l'authentification Discord
	},


};