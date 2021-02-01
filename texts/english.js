const Discord = require("discord.js");
const moment = require("moment");

module.exports = class {
    constructor() {
        this.textes = {

            // Examples
            FUNCTION: (variable1, variable2) => {
                return `Text with ${variable1} and also ${variable2}`;
            },
            OBJECT: [
                "First entry",
                "Second entry",
                "..."
            ],
            DEFAULT: "A simple text",


            // 
            



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


