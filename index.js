const Discord = require('discord.js')
const auth = require('./auth.json')
const fetch = require('node-fetch')
const querystring = require('querystring')

const bot = new Discord.Client()

bot.login(auth.token)

bot.on("ready", async ()=>{
    await console.log(`${bot.user.username} is online and serving ${bot.guilds.size} servers`)
    bot.user.setActivity(`YourMom`, {type: "WATCHING"})
})

bot.on("message", async (message)=>{
    if(message.author.bot)return;
    if(message.channel.type === "dm")return;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    const query = querystring.stringify({term: args.join(' ')});

    if(cmd === 'urban'){
        if(!args.length){
            return message.channel.send('You need to supply a search term!')
        }

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response =>  response.json());

        if(!list.length){
            return message.channel.send(`No results found for search term **${args.join(' ')}**.`)
        }

        message.channel.send(list[0].definition);

    }

})