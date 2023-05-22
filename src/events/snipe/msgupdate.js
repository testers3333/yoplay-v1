const { Client, Message } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Client} client
     * @param {Message} old
     * @param {Message} message
     */
    async run(client, old, message) {
        if(!message.guild) return;
        db.set("dsnipe-"+message.channel.id, {
            id: message.id,
            old: old.content,
            newm: message.content,
            attachments: message.attachments.first()?.proxyURL || null,
            guildId: message.guild.id,
            authorId: message.author.id
        })
    }
}