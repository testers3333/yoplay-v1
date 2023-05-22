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
        name: "classement",
        description: "Liste les utilisateurs du plus haut au plus bas dans une catégorie de commandes.",
        options: [],
        type: "CHAT_INPUT"
    })

    client.application.commands.create({
        name: "rôle-utilisateurs",
        description: "Affiche les utilisateurs possédants un même rôle en commun.",
        options: [
            {
                name: "rôle",
                description: "Mention du rôle.",
                required: true,
                type: "ROLE"
            }
        ],
        type: "CHAT_INPUT"
    })

    /*client.application.commands.create({
        name: "panel",
        description: "Affiche le panel de configuration de l'hébergeur.",
        options: [],
        type: "CHAT_INPUT"
    })*/

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
        name: "travail",
        description: "Vous permet d'augmenter votre monnaie.",
        options: [
            {
                name: "rapide",
                description: "Un travail rapide pour peu de récompenses !",
                options: [],
                type: "SUB_COMMAND"
            },
            {
                name: "quotidien",
                description: "Une journée de travail classique pour quelques récompenses !",
                options: [],
                type: "SUB_COMMAND"
            },
            {
                name: "mensuel",
                description: "Un long mois de travail pour de superbes récompenses !",
                options: [],
                type: "SUB_COMMAND"
            },
            {
                name: "annuel",
                description: "Une année acharnée pour les plus belles récompenses qui soit !",
                options: [],
                type: "SUB_COMMAND"
            }
        ],
        type: "CHAT_INPUT"
    })

    client.application.commands.create({
        name: "monnaie",
        description: "Affiche les statistiques de l'économie pour un utilisateur.",
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
        name: "pendu",
        description: "Lance une partie de pendu.",
        options: [
            {
                name: "catégorie",
                description: "Catégorie du pendu.",
                required: true,
                type: "STRING",
                choices: [
                    {
                        name: "Animal",
                        value: "nature"
                    },
                    {
                        name: "Couleur",
                        value: "color"
                    },
                    {
                        name: "Sport",
                        value: "sport"
                    },
                    {
                        name: "Aliment",
                        value: "fruit"
                    },
                    {
                        name: "Pokémon",
                        value: "pokemon"
                    }
                ]
            },
            {
                name: "mise",
                description: "Mise de la partie.",
                required: false,
                type: "INTEGER",
                minValue: 1
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
