const Discord = require("discord.js");
const moment = require("moment");

module.exports = class {
    constructor() {
        this.textes = {

            // Exemples
            FUNCTION: (variable1, variable2) => {
                return `Texte avec ${variable1} et aussi ${variable2}`;
            },
            OBJECT: [
                "Première entrée",
                "Seconde entrée",
                "..."
            ],
            DEFAULT: "Un simple texte",

            // Commandes    
            
            // OWNER

            CMD_OWNER_EVAL_DESCRIPTION: "",
            CMD_OWNER_EVAL_USAGE: ""
            



        }
    }

    get(term, ...args) {
        const value = this.textes[term];
        
        switch (typeof value) {
            case "function":
                return value(...args);
            case "object":
                return value.random();
            default:
                return value;
        }
    };

};


