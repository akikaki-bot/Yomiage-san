const http = require('http');

http.createServer(function (req, res) {
  res.end();
}).listen(8080);

//==================依存関係を呼んでパーティーをする===============
const {
  Discord,
  MessageEmbed,
  Client,
  Intents,
  MessageActionRow,
  MessageSelectMenu
} = require('discord.js')
// まじでvoice分離するなはげ！
const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  StreamType,
  getVoiceConnection,
  AudioPlayerStatus
} = require("@discordjs/voice");

const Keyv = require('keyv')

const {
  VoiceText
} = require('voice-text')

const {
  writeFileSync,
  createWriteStream
} = require('fs');

const option = {
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]
}

//カスタムデータベース
const db = new Keyv('sqlite://database.sqlite', {
  table: 'database'
})
const dic = new Keyv('sqlite://dic.sqlite', {
  table: 'dictionary'
})
const sp = new Keyv('sqlite://speaker.sqlite', {
  table: 'speaker'
})



const client = new Client(option)

//=============== main =====================
const { main } = require('./lib/main.js')
const { ion } = require('./commands/ion.js')
const { ioff } = require('./commands/ioff.js')
const { dictionary } = require('./commands/dictionary.js') 
const { speakch } = require('./commands/speakch.js')
const { changesp } = require('./commands/changesp.js')
const { user } = require('./commands/use.js')
//const { join } = require('./lib/join.js')
//==========================================
client.on('ready', async () => {
  client.user.setActivity({
    name:"/on | VoiceTextを使用したTTSBotです。"
  })
  console.log('Google Teacher v1.0')
  const { generateDependencyReport } = require('@discordjs/voice');

//==============slashcommand================
 //const serverid = "536491197305454602"
//==========================================
  console.log(generateDependencyReport());
      const data = [
        {
        name: "on",
        description: "TSSをオンにします。",
        },
        {
          name: "off",
          description: "TTSをオフにします。"
        },
        {
          name: "dictionary",
          description: "辞書機能です。",
          options: [
            {
              type:"STRING",
              name:"word",
              description : "登録する文字",
              required: true,
            },
            {
              type: "STRING",
              name : "読み上げ方",
              description : "登録した文字の読み上げ方",
              required: true,
            },
          ]
        },
        {
          name: "dictionary_remove",
          description: "辞書をすべて消します。"
        },
        {
          name: "speaker_change",
          description: "話す人を変えます。デフォ: haruka",
          
        },
        {
          name: "help",
          description: "ヘルプページ。"
        },
        {
          name: "status",
          description: "利用状況確認。"
        }
    ];
    await client.application.commands.set(data);
})


client.on('messageCreate', async message => {

  const spea = await sp.get(`${message.guild.id}`)
  if(!spea) return sp.set(`${message.guild.id}`,"haruka")
  
  //=================MessageEvent=======================

  if (message.author.bot || message.channel.type === "dm") return;

  //=================VoiceTextApi=======================

  const voiceText = new VoiceText(process.env.key);

  //=================Main handler=======================

 try{ main(db,message,voiceText,createAudioPlayer,createAudioResource,AudioPlayerStatus,writeFileSync,getVoiceConnection,StreamType,joinVoiceChannel,dic,sp,createWriteStream)
    }catch(e){
   console.log(e.message)
    }

  //help================================================

  if(message.content === ":help"){
    const embed = new MessageEmbed().setTitle('VoiceText - TextToSpeachBot v3.0.1').addField('/on','TTS機能を有効化します。\nユーザーのDefaultの音声は`hikari Normal`です。').addField('/off','TTS機能を無効化します。').addField('/speaker_change','話す人を変更できます。\n・選択できる感情\n `Happiness`, `Angry`, `Sadness`\n※感情は「しょう」には存在しません。\n・選択できる話す人\n`はるか`,`しょう`, `ひかり (Default)`,`たける`,`さんた`,`くま`').addField("/dictionary [Word] [読み上げ方]",'辞書機能です。読み方を変更できます。').addField("/dictionary_remove",'辞書データをすべて削除します。').setColor('GREEN')
    message.channel.send({ embeds: [embed]})
  }
})

//interaction===========================================
client.on('interactionCreate', async interaction => {

  if(interaction.customId === "chsp"){
    changesp(interaction,sp,MessageEmbed)
  }

  
  if (!interaction.isCommand()) {
        return;
    }
  //help

  if(interaction.commandName === "help"){
        const embed = new MessageEmbed().setTitle('VoiceText - TextToSpeachBot v3.0.1').addField('/on','TTS機能を有効化します。\nユーザーのDefaultの音声は`hikari Normal`です。').addField('/off','TTS機能を無効化します。').addField('/speaker_change','話す人を変更できます。\n・選択できる感情\n `Happiness`, `Angry`, `Sadness`\n※感情は「しょう」には存在しません。\n・選択できる話す人\n`はるか`,`しょう`, `ひかり (Default)`,`たける`,`さんた`,`くま`').addField("/dictionary [Word] [読み上げ方]",'辞書機能です。読み方を変更できます。').addField("/dictionary_remove",'辞書データをすべて削除します。').setColor('GREEN')
    interaction.reply({ embeds: [embed]})
  }
  
  //=================on=================================

  if (interaction.commandName === "on") {
    ion(db,interaction,joinVoiceChannel,MessageEmbed,StreamType,createAudioResource,createAudioPlayer)
  }

  //=================off================================

  if (interaction.commandName === "off") {
    ioff(joinVoiceChannel,db,interaction,MessageEmbed)
  }

  if(interaction.commandName === "dictionary"){
    dictionary(interaction,dic)
  }

  if(interaction.commandName === "speaker_change"){
    speakch(interaction,MessageEmbed,sp,MessageActionRow,MessageSelectMenu)
  }

  if(interaction.commandName === "status"){
    interaction.reply('準備中だあほ')
  }

  if(interaction.commandName === "dictionary_remove"){
   await dic.delete(`${interaction.guild.id}_words`)
   await dic.delete(`${interaction.guild.id}_speak`)
    await interaction.reply('リセットしました。')
  }



  
})
client.login(process.env.token)
