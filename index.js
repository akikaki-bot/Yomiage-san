const http = require('http');

http.createServer(function (req, res) {
  res.end();
}).listen(8080);

//==================依存関係を呼んでパーティーをする===============
const {
  Discord,
  MessageEmbed,
  Client,
  Intents
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
  writeFileSync
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
const client = new Client(option)

//=============== main =====================
const { main } = require('./lib/main.js')
const { on } = require('./commands/on.js');
const { ion } = require('./commands/ion.js')
const { off } = require('./commands/off.js')
const { ioff } = require('./commands/ioff.js')
const { dictionary } = require('./commands/dictionary.js') 
//const { join } = require('./lib/join.js')
//==========================================
client.on('ready', async () => {
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
        }
    ];
    await client.application.commands.set(data);
})
client.on('messageCreate', async message => {
  //=================MessageEvent=======================

  if (message.author.bot || message.channel.type === "dm") return;

  //=================VoiceTextApi=======================

  const voiceText = new VoiceText(process.env.key);

  //================= CLI ENT ==========================
  //join(client)
  //====================================================
 const dis = async (client) => {
   const dc = await client.voice.adapters.get(message.guild.id)
   console.log(dc)
   dc.destory
    //const embed = new MessageEmbed().setTitle('TTS機能を無効にしました。').setDescription('このTTS読み上げにはvoiceTextのAPIを使用しています。\n 詳しくは公式HPを参考にしてください。\n[《VoiceText公式》](https://cloud.voicetext.jp/webapi)\n\n《注意事項》\n**・開発者はVoiceTextの利用規約に沿ってBOTを運用しています。**\n**・利用により金銭が発生することはありません。**\n**・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。**')
    //message.channel.send({
    //  embeds:[embed]
   // })
   }
  
  //=================Main handler=======================

 try{ main(db,message,voiceText,createAudioPlayer,createAudioResource,AudioPlayerStatus,writeFileSync,getVoiceConnection,StreamType,joinVoiceChannel,dic)
    }catch(e){
   console.log(e.message)
    }

  //=================commandhandler=====================
if(message.content === ":tst"){
  dis(client)
}
  //=================on=================================

  if (message.content === ":on") {
  on(db,message,joinVoiceChannel,MessageEmbed)
  }

  //=================off================================

  if (message.content === ":off") {
    off(db,message,MessageEmbed)
  }

  //help================================================

  if(message.content === ":help"){
    const embed = new MessageEmbed().setTitle('TTSボット').setDescription(':help\n:join\n:off')
    message.channel.send({ embeds: [embed]})
  }
})

//interaction===========================================
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
        return;
    }
  //=================on=================================

  if (interaction.commandName === "on") {
    ion(db,interaction,joinVoiceChannel,MessageEmbed)
  }

  //=================off================================

  if (interaction.commandName === "off") {
    ioff(db,interaction,MessageEmbed)
  }

  if(interaction.commandName === "dictionary"){
    dictionary(interaction,dic)
  }

  if(interaction.commandName === "dictionary_remove"){
   await dic.delete(`${interaction.guild.id}_words`)
   await dic.delete(`${interaction.guild.id}_speak`)
    await interaction.reply('リセットしました。')
  }

  
})
client.login(process.env.token)
