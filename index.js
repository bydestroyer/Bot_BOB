const Discord = require('discord.js');
const config = require('./config/config.json');
const Enmap = require('enmap');

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MEMBERS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
	]
})

client.login(config.token)

client.on("ready", () => {
	console.log('Conectado como ${client.user.tag}')
});

client.setups = new Enmap({
	name: "setups",
	dataDir: "./databases"
})

client.on("messageCreate", async (message) => {
	if(message.author.bot || !message.guild || !message.channel) return;
	client.setups.ensure(message.guild.id, {
		welcomechannel: "",
		welcomemessage: "",
	});
	const args = message.content.slice(config.prefix.length).trim().split(" ")
	const command = args.shift()?.toLowerCase();

	if(command == "ping"){
		return message.reply('El ping del bot es de \'${client.ws.ping}ms\'')
	}
})