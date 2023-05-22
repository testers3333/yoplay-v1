const { CommandInteraction, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "latence",
    description: "Affiche les latences du client sous différents formats.",
    args: [

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
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        return await new Promise((resolve, reject) => {
            try {
                let a = Date.now();
                interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                        .setColor("#43B581")
                        .setDescription("Voici l'affichage de ma latence sous différents formats.")
                        .addFields(
                            {
                                name: "`Latences`",
                                value: `**Base de donnée:** \`...\`\n**API Passerelle:** \`...\`\n**Réponse Discord:** \`...\``,
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
                            .setCustomId("ping")
                            .setDisabled(true)
                            .setLabel("Programme opérationnel !")
                            .setStyle("SUCCESS")
                        )
                    ]
                })
                    .then(async (msg) => {
                        let b = Date.now() - a;
                        let c = Date.now();
                        await db.all();
                        let d = Date.now() - c;
                        msg.edit({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#43B581")
                                .setDescription("Voici l'affichage de ma latence sous différents formats.")
                                .addFields(
                                    {
                                        name: "`Latence`",
                                        value: `>>> **Base de donnée:** \`${d}ms\`\n**API Passerelle:** \`${client.ws.ping}ms\`\n**Réponse Discord:** \`${b}ms\``,
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
                                    .setCustomId("ping")
                                    .setDisabled(true)
                                    .setLabel("Programme opérationnel !")
                                    .setStyle("SUCCESS")
                                )
                            ]
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