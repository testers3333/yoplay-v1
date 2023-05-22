const { Client, MessageActionRow, MessageButton, MessageEmbed, UserContextMenuInteraction } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "snipe",
    description: "Affiche la dernière suppression du salon.",
    args: [
        {
            name: "choix",
            type: "STRING",
            required: true,
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
            type: "CHANNEL",
            required: false,
            channelTypes: [
                "Textuel",
                "Annonces",
            ]
        }
    ],
    ownerOnly: false,
    voiceOnly: false,
    adminOnly: false,
    sub_names: [

    ],
    cooldown: 15,
    disabled: false,
    /**
     * 
     * @param {Client} client 
     * @param {UserContextMenuInteraction} interaction 
     */
    run: async (client, interaction) => {
        return await new Promise(async (resolve, reject) => {
            try {
                let choice = interaction.options.get("choix").value;
                if(choice === "messageupdate") {
                    let channel = interaction.options.get("salon")?.value ? client.channels.cache.get(interaction.options.get("salon").value) : interaction.channel;
                    let res = await db.get("dsnipe-"+channel.id);
                    if(!res) {
                        return interaction.editReply({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#ed4147")
                                .setDescription("Aucun message modifié récemment ici.")
                                .setFooter({
                                    text: "402 - Objet manquant",
                                    iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                })
                                .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                            ]
                        })
                    }

                    let author = client.users.cache.get(res.authorId);
                    let guild = client.guilds.cache.get(res.guildId);
                    let img = res.attachments ? res.attachments : null;

                    interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                            .setColor("#43B581")
                            .setDescription("Voici la dernière modification du salon <#"+channel.id+">.")
                            .addFields(
                                {
                                    name: "`Auteur`",
                                    value: `>>> **Mention:** <@${author.id}>\n**Identifiant:** \`${author.id}\`\n**Type:** \`${author.bot ? "Robot" : "Humain"}\`\n**Création:** <t:${parseInt(author.createdTimestamp / 1000)}:R>`,
                                    inline: true
                                },
                                {
                                    name: "`Guilde`",
                                    value: `>>> **Nom:** \`${guild.name}\`\n**Identifiant:** \`${guild.id}\`\n**Membres:** \`${guild.members.cache.size}\`\n**Création:** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                                    inline: true
                                },
                                {
                                    name: "`Ancien contenu`",
                                    value: `\`\`\`${res.old ? res.old : "Aucun contenu."}\`\`\``,
                                    inline: false
                                },
                                {
                                    name: "`Nouveau contenu`",
                                    value: `\`\`\`${res.content ? res.content : "Aucun contenu."}\`\`\``,
                                    inline: false
                                }
                            )
                            .setFooter({
                                text: "200 - Succès",
                                iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                            })
                            .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                        ]
                    })
                    .then(async (msg) => {
                       resolve()
                    })
                    .catch((e) => reject(e));
                } else if(choice === "messagedelete") {
                    let channel = interaction.options.get("salon")?.value ? client.channels.cache.get(interaction.options.get("salon").value) : interaction.channel;
                    let res = await db.get("snipe-"+channel.id);
                    if(!res) {
                        return interaction.editReply({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#ed4147")
                                .setDescription("Aucun message supprimé récemment ici.")
                                .setFooter({
                                    text: "402 - Objet manquant",
                                    iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                })
                                .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                            ]
                        })
                    }
  
                    let author = client.users.cache.get(res.authorId);
                    let guild = client.guilds.cache.get(res.guildId);
                    let img = res.attachments ? res.attachments : null;

                    interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                            .setColor("#43B581")
                            .setDescription("Voici la dernière suppression du salon <#"+channel.id+">.")
                            .addFields(
                                {
                                    name: "`Auteur`",
                                    value: `>>> **Mention:** <@${author.id}>\n**Identifiant:** \`${author.id}\`\n**Type:** \`${author.bot ? "Robot" : "Humain"}\`\n**Création:** <t:${parseInt(author.createdTimestamp / 1000)}:R>`,
                                    inline: true
                                },
                                {
                                    name: "`Guilde`",
                                    value: `>>> **Nom:** \`${guild.name}\`\n**Identifiant:** \`${guild.id}\`\n**Membres:** \`${guild.members.cache.size}\`\n**Création:** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                                    inline: true
                                },
                                {
                                    name: "`Contenu`",
                                    value: `\`\`\`${res.content ? res.content : "Aucun contenu."}\`\`\``,
                                    inline: false
                                }
                            )
                            .setFooter({
                                text: "200 - Succès",
                                iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                            })
                            .setImage(img)
                        ]
                    })
                    .then(async (msg) => {
                       resolve()
                    })
                    .catch((e) => reject(e));
                }
            } catch (e) {
                reject(e);
            }
        })
    }
}