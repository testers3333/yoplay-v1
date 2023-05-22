const { Client, MessageActionRow, MessageButton, MessageEmbed, UserContextMenuInteraction } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "bannière",
    description: "Affiche la bannière d'un utilisateur.",
    args: [
        {
            name: "utilisateur",
            type: "USER",
            required: false
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
                let mentioned = interaction.targetUser;
                let user = (await mentioned.fetch())
                if(!user.banner) {
                    return interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                            .setColor("#ed4147")
                            .setDescription("L'utilisateur désigné n'a aucune bannière d'utilisée.")
                            .setFooter({
                                text: "402 - Objet manquant",
                                iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                            })
                            .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                        ]
                    })
                }

                interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                        .setColor("#43B581")
                        .setDescription("Voici la bannière de <@"+user.id+">.")
                        .setFooter({
                            text: "200 - Succès",
                            iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                        })
                        .setImage(user.bannerURL({dynamic: true, size: 2048, format: "png"}))
                    ],
                    components: [
                        new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setURL(user.bannerURL({dynamic: true, size: 2048, format: "png"}))
                            .setDisabled(true)
                            .setLabel("Ouvrir le lien")
                            .setStyle("LINK")
                        )
                    ]
                })
                    .then(async (msg) => {
                       resolve()
                    })
                    .catch((e) => reject(e));
            } catch (e) {
                reject(e);
            }
        })
    }
}