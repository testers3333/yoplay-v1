const { Client } = require("discord.js");

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    client.application.commands.create({
        name: "bannière",
        options: [],
        type: "USER"
    })
}