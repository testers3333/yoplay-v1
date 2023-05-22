require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");

const client = new Client({
    partials: ["CHANNEL", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "MESSAGE", "REACTION", "USER"],
    intents: [
        Intents.FLAGS.AUTO_MODERATION_CONFIGURATION,
        Intents.FLAGS.AUTO_MODERATION_EXECUTION,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.MESSAGE_CONTENT
    ]
})

readdirSync("./src/events").forEach((folder) => {
    readdirSync(`./src/events/${folder}`).forEach((file) => {
        let d = require(`./events/${folder}/${file}`);
        client.on(d.name, async (...args) => d.run(client, ...args));
    })
})

client.login(process.env["token"]);