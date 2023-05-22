const { Client, Message } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "messageDelete",
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     */
    async run(client, message) {
        if(!message.guild) return;
        db.set("snipe-"+message.channel.id, {
            id: message.id,
            content: message.content,
            attachments: message.attachments.first()?.proxyURL || null,
            guildId: message.guild.id,
            authorId: message.author.id
        })
    }
}