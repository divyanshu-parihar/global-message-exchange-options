require('dotenv').config();
const { Client, GatewayIntentBits, Partials, AttachmentBuilder, EmbedBuilder ,TextChannel} = require('discord.js');
const { HostServerId } = require('./config');
// const { token } = require('./config');
const { channels, token } = require('./config-dev');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel],
});

client.on('messageCreate', (message) => {
    if (channels.includes(message.channel.id)) {

        let channels = client.channels.cache.filter(ch => ch instanceof TextChannel && ch.name === message.channel.name);
        for (let recipentChannel of channels) {
            if (HostServerId.includes(recipentChannel.guildId)) continue;
            recipentChannel.forEach((channel)=>{
                if(channel.id === undefined) return;;
                client.channels.cache.get(channel.id).send({
                    files: [...message.attachments.values()],
                    content: message.content ? message.content : undefined
                });
                console.log('confirmed')
            })
        }

    }
})

client.once('ready', () => {
    console.log('Hurrah! Bot is ready. ')
})

client.login(token)