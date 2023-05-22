const { Client, ButtonInteraction } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {Client} client,
     * @param {ButtonInteraction} interaction
     */
    async run(client, interaction) {
        if(!interaction.isButton()) return;
        let d = interaction.customId.split(".");
        if(d[0] === "corrected") {
            if(d[1] !== "user") {
                let a = require("../../commands/"+d[1]+"/"+d[2]);
                a.disabled = false;
            } else {
                let a = require("../../context/"+d[1]+"/"+d[2]);
                a.disabled = false;
            }
            await interaction.deferUpdate();
            interaction.message.edit({
                embeds: [interaction.message.embeds[0]],
                components: []
            })
        }
    }
}