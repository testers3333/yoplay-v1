const { Client } = require("discord.js");

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    client.application.commands.create({
        name: "latence",
        description: "Affiche les latences du client sous différents formats.",
        options: [],
        type: "CHAT_INPUT"
    })

    client.application.commands.create({
        name: "bannière",
        description: "Affiche la bannière d'un utilisateur.",
        options: [
            {
                name: "utilisateur",
                description: "Mention de l'utilisateur.",
                required: false,
                type: "USER"
            }
        ],
        type: "CHAT_INPUT"
    })

    client.application.commands.create({
        name: "snipe",
        description: "Affiche un évènement récent.",
        options: [
            {
                name: "choix",
                description: "Elément à snipe.",
                required: true,
                type: "STRING",
                choices: [
                    {
                        name: "Suppression de message",
                        value: "messagedelete"
                    },
                    {
                        name: "Modification de message",
                        value: "messageupdate"
                    }
                ]
            },
            {
                name: "salon",
                description: "Mention du salon.",
                required: false,
                type: "CHANNEL",
                channelTypes: [
                    "GUILD_FORUM",
                    "GUILD_NEWS",
                    "GUILD_NEWS_THREAD",
                    "GUILD_TEXT",
                    "GUILD_PRIVATE_THREAD",
                    "GUILD_PUBLIC_THREAD"
                ]
            }
        ],
        type: "CHAT_INPUT"
    })

    client.application.commands.create({
        name: "administrateurs",
        description: "Affiche la liste des administrateurs sous forme de pages.",
        options: [],
        type: "CHAT_INPUT"
    })

    client.application.commands.create({
        name: "robots",
        description: "Affiche la liste des robots sous forme de pages.",
        options: [],
        type: "CHAT_INPUT"
    })

    client.application.commands.create({
        name: "boosters",
        description: "Affiche la liste des boosters sous forme de pages.",
        options: [],
        type: "CHAT_INPUT"
    })
}