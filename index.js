const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('Server is Started');
});

const Discord = require('discord.js');
const client = new Discord.Client();
const setting = require('./setting.json')
client.on("ready", () => {
  console.log(`[ - Bot is Online - ]`);
  console.log(`Name Bot : ${client.user.username}`);
  console.log(`Guilds : ${client.guilds.cache.size}`);
  console.log(`Users : ${client.users.cache.size}`);
  console.log(`Channels : ${client.channels.cache.size}`);
  client.user.setActivity(`${prefix}order`, {
    type: "PLAYING"
  });
});


const prefix = setting.prefix;
const ochannel = setting.ochannel;
const orole = setting.orole;
const oline = setting.oline;



client.on("message", message => {
if(message.content.startsWith(prefix + "order" || prefix + "طلب")){
  const args = message.content.split(" ").slice(" ").join()
  const ch = client.channels.cache.get(ochannel);
 message.react("✅")
message.react("❎")

  // Filters
  const yesFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id
  const noFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id

  const yes = message.createReactionCollector(yesFilter, {timer: 6000})
  const no = message.createReactionCollector(noFilter, {timer: 6000})
   yes.on('collect', (r, u) => {
      message.delete();
      message.reply("Done Send Your Order Wait , ☑️")
  ch.send(`<@&${orole}>`)
 const embed = new Discord.MessageEmbed()
.setAuthor("New Order!", client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setColor("RANDOM")
.setDescription(`
**Order :**
\`\`\`
${args}
\`\`\`
`)
.addField("Username", message.author.username, false)
.addField("ID", message.author.id, false)
.setTimestamp()
 ch.send(embed)
 ch.send(oline)
 
  })

     no.on('collect', (r, u) => {
      message.delete();
  })

  
}
})

client.login(process.env.token).catch(e => {
return console.log("Invalid Token")    
})
