
const { Client, MessageEmbed, MessageActionRow, MessageButton, UserContextMenuInteraction } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {Client} client 
     * @param {UserContextMenuInteraction} interaction
     */
    async run(client, interaction) {
        if(!interaction.isUserContextMenu()) return;
        readdirSync("./src/context/user/").forEach((folder) => {
            readdirSync(`./src/context/user/`).forEach(async (file) => {
                let d = require(`../../context/user/${file}`);
                
                if(d.name === interaction.commandName) {
                    if(d.disabled) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#ed4147")
                                .setDescription("Cette commande à été désactivé suite à une erreur du programme. Merci de votre compréhension !")
                                .setFooter({
                                    text: "401 - Manque d'authorization",
                                    iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                })
                                .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                            ]
                        })
                    }

                    if(d.ownerOnly && process.env["owner"] !== interaction.user.id) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#ed4147")
                                .setDescription("Seul mon créateur peut toucher à ça !")
                                .setFooter({
                                    text: "401 - Manque d'authorization",
                                    iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                })
                                .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                            ]
                        })
                    }

                    if(d.voiceOnly && !interaction.member.voice.channel) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#ed4147")
                                .setDescription("Il semblerait qu'aucune séssion vocale soit attachée à vous !")
                                .setFooter({
                                    text: "401 - Manque d'authorization",
                                    iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                })
                                .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                            ]
                        })
                    }

                    if(d.adminOnly && !interaction.member.permissions.has("ADMINISTRATOR")) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#ed4147")
                                .setDescription("Il semblerait que les permissions qui vous sont attribuées ne sont assez importantes !")
                                .setFooter({
                                    text: "401 - Manque d'authorization",
                                    iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                })
                                .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                            ]
                        })
                    }

                    await interaction.deferReply();
                    if(d.cooldown && db.get("cooldown-u-"+d.name+"-"+interaction.user.id) && db.get("cooldown-"+d.name+"-"+interaction.user.id) > parseInt(Date.now() / 1000)) {
                        return interaction.editReply({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#ed4147")
                                .setDescription("Merci d'attendre encore quelques temps avant de réutiliser la commande. Revenez <t:"+ db.get("cooldown-u-"+d.name+"-"+interaction.user.id) +":R> !")
                                .setFooter({
                                    text: "401 - Manque d'authorization",
                                    iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                })
                                .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                            ]
                        })
                    }

                    db.set("cooldown-u-"+d.name+"-"+interaction.user.id, parseInt(Date.now() / 1000) + d.cooldown);
                    return d.run(client, interaction).catch((e) => {
                        d.disabled = true;
                        client.channels.cache.get(process.env["error_channel"]).send({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#ed4147")
                                .setDescription(`Une erreur est survenue ! \`\`\`${e}\`\`\``)
                                .setFooter({
                                    text: "501 - Erreur interne",
                                    iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                })
                                .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                            ],
                            components: [
                                new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                    .setCustomId("corrected."+"user"+"."+file+"."+false)
                                    .setLabel("Corrigé ?")
                                    .setStyle("DANGER")
                                    .setDisabled(false)
                                )
                            ]
                        })
                        return interaction.editReply({
                            embeds: [
                                new MessageEmbed()
                                .setColor("#ed4147")
                                .setDescription("Une erreur est survenue, le problème nous a été envoyé. Merci de patienter !")
                                .setFooter({
                                    text: "501 - Erreur interne",
                                    iconURL: "https://cdn.discordapp.com/emojis/1013206759873192077"
                                })
                                .setImage("https://cdn.discordapp.com/attachments/1088512918892580884/1092522616293687348/37C13065-E868-4FB3-B039-BE291A5B8632-removebg-preview.png")
                            ]
                        })
                    })
                }
            })
        })
    }
}