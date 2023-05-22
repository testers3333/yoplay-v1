const { Client } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "ready",
    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        require("../../builders/SlashCommand")(client)
        require("../../builders/userContextMenu")(client)
        console.log("je suis connecté en tant que " + client.user.tag);
    }
}