const { CommandInteraction, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "rôle-utilisateurs",
    description: "Affiche la liste des utilisateurs ayant un même rôle en commun sous forme de pages.",
    args: [

    ],
    ownerOnly: false,
    voiceOnly: false,
    adminOnly: true,
    sub_names: [

    ],
    cooldown: 90,
    disabled: false,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        return await new Promise((resolve, reject) => {
            try {
                let role = interaction.guild.roles.cache.get(interaction.options.get("rôle").value);
                let p = 0;
                let q = 9;
                interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                        .setColor("#43B581")
                        .setDescription("Voici la liste des utilisateurs ayant le rôle <@&"+role.id+"> sur ce serveur.")
                        .addFields(
                            {
                                name: "`Utilisateurs`",
                                value: `>>> ${interaction.guild.members.cache.filter((m) => m.roles.cache.get(role.id)).map((m) => `<@${m.id}> \`${m.user.tag}\``).slice(p, q).join("\n")}`,
                                inline: true
                            }
                        )
                        .setFooter({
                            text: "200 - Succès",
                            iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                        })
                        .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                    ],
                    components: [
                        new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId("adm-before")
                            .setDisabled(true)
                            .setLabel("Page précédente")
                            .setStyle("SUCCESS")
                        )
                        .addComponents(
                            new MessageButton()
                            .setCustomId("adm-next")
                            .setDisabled(interaction.guild.members.cache.filter((m) => m.roles.cache.get(role.id)).size > q ? false : true)
                            .setLabel("Page suivante")
                            .setStyle("SUCCESS")
                        )
                    ]
                })
                 .then(async (msg) => {
                        let collector = await msg.createMessageComponentCollector({time: 90_000})
                        collector.on("end", (c) => {
                            msg.edit({
                                embeds: [msg.embeds[0]],
                                components: [
                                    new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                        .setCustomId("adm-before")
                                        .setDisabled(true)
                                        .setLabel("Page précédente")
                                       .setStyle("SUCCESS")
                                    )
                                    .addComponents(
                                        new MessageButton()
                                        .setCustomId("adm-next")
                                        .setDisabled(true)
                                        .setLabel("Page suivante")
                                        .setStyle("SUCCESS")
                                    )
                                ]
                            })
                        })
                        
                        collector.on("collect", async (i) => {
                            if(i.user.id !== interaction.user.id) {
                                await i.deferReply({ephemeral: true})
                                return i.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor("#ed4147")
                                        .setDescription("Seul l'éxécuteur de la commande peut intéragir !")
                                        .setFooter({
                                            text: "401 - Manque d'authorization",
                                            iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                        })
                                        .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                                    ],
                                    ephemeral: true
                                })
                            }

                            i.deferUpdate();
                            if(i.customId === "adm-next"){
                                p+=9;
                                q+=9;
                            } else {
                                p-=9;
                                q-=9;
                            }

                            msg.edit({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor("#43B581")
                                    .setDescription("Voici la liste des utilisateurs ayant le rôle <@&"+role.id+"> sur ce serveur.")
                                    .addFields(
                                        {
                                            name: "`Utilisateurs`",
                                            value: `>>> ${interaction.guild.members.cache.filter((m) => m.roles.cache.get(role.id)).map((m) => `<@${m.id}> \`${m.user.tag}\``).slice(p, q).join("\n")}`,
                                            inline: true
                                        }
                                    )
                                    .setFooter({
                                        text: "200 - Succès",
                                        iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                    })
                                    .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                                ],
                                components: [
                                    new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                        .setCustomId("adm-before")
                                        .setDisabled(p === 0 ? true : false)
                                        .setLabel("Page précédente")
                                        .setStyle("SUCCESS")
                                    )
                                    .addComponents(
                                        new MessageButton()
                                        .setCustomId("adm-next")
                                        .setDisabled(interaction.guild.members.cache.filter((m) => m.roles.cache.get(role.id)).size > q ? false : true)
                                        .setLabel("Page suivante")
                                        .setStyle("SUCCESS")
                                    )
                                ]
                            })
                        })
                        resolve()
                    })
                    .catch((e) => reject(e));
            } catch (e) {
                reject(e);
            }
        })
    }
}
