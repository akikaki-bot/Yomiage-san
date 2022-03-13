const http = require('http');
http.createServer(function (req, res) {
  res.end();
}).listen(8080);
const {
  Discord,
  MessageEmbed,
  Client,
  Intents
} = require('discord.js')
const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  StreamType,
  getVoiceConnection,
  AudioPlayerStatus
} = require("@discordjs/voice");
const option = {
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]
}
const Keyv = require('keyv')
//カスタムデータベース
const db = new Keyv('sqlite://database.sqlite', {
  table: 'database'
})
const client = new Client(option)
const {
  VoiceText
} = require('voice-text')
const {
  writeFileSync
} = require('fs');
//=============== main =====================
const {
  main
} = require('./main.js')

//==========================================
client.on('ready', async () => {
  console.log('Google Teacher v1.0')
  const { generateDependencyReport } = require('@discordjs/voice');

  console.log(generateDependencyReport());
      const data = [
        {
        name: "on",
        description: "TSSをオンにします。",
        },
        {
          name: "off",
          description: "TTSをオフにします。"
        }
    ];
    await client.application.commands.set(data, '536491197305454602');
})
client.on('messageCreate', async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  const voiceText = new VoiceText('APIkey');
  main(db,message,voiceText,createAudioPlayer,createAudioResource,AudioPlayerStatus,writeFileSync,getVoiceConnection,StreamType,joinVoiceChannel)
  if (message.content === ":on") {
    db.get(`${message.guild.id}_joined`).then(async v => {
      if (v === true) return message.reply('すでに有効です。')
      else {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.reply('参加することが不可能です。')
        if (!memberVC.joinable) return message.reply('参加できないボイスチャンネルです。')
        const connection = joinVoiceChannel({
          guildId: message.guild.id,
          channelId: message.member.voice.channel.id,
          adapterCreator: message.guild.voiceAdapterCreator,
          selfMute: false,
        });
        await db.set(`${message.guild.id}_joined`, true).then(() => {
          message.reply('参加しました。')
          const embed = new MessageEmbed().setTitle('TTS機能を有効にしました。').setDescription('このTTS読み上げにはvoiceTextのAPIを使用しています。\n 詳しくは公式HPを参考にしてください。\n[《VoiceText公式》](https://cloud.voicetext.jp/webapi)\n\n《注意事項》\n**・開発者はVoiceTextの利用規約に沿ってBOTを運用しています。**\n**・利用により金銭が発生することはありません。**\n**・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。**')
          message.reply({
            embeds: [embed]
          })
        })
      }
    })
  }
  if (message.content === ":off") {
    const memberVC = message.member.voice.channel;
    if (!memberVC) return message.reply('操作することが不可能です。')
    if (!memberVC.joinable) return message.reply('操作できないボイスチャンネルです。')
    db.delete(`${message.guild.id}_joined`).then(() => {
      const embed = new MessageEmbed().setTitle('TTS機能を無効にしました。').setDescription('このTTS読み上げにはvoiceTextのAPIを使用しています。\n 詳しくは公式HPを参考にしてください。\n[《VoiceText公式》](https://cloud.voicetext.jp/webapi)\n\n《注意事項》\n**・開発者はVoiceTextの利用規約に沿ってBOTを運用しています。**\n**・利用により金銭が発生することはありません。**\n**・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。**')
      message.reply({
        embeds: [embed]
      })
    })
  }
  if(message.content === ":help"){
    const embed = new MessageEmbed().setTitle('TTSボット').setDescription(':help\n:join\n:off')
    message.channel.send({ embeds: [embed]})
  }
})

//interaction
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
        return;
    }
  if (interaction.commandName === "on") {
    db.get(`${interaction.guild.id}_joined`).then(async v => {
      if (v === true) return interaction.reply('すでに有効です。')
      else {
        const memberVC = interaction.member.voice.channel;
        if (!memberVC) return interaction.reply('参加することが不可能です。')
        if (!memberVC.joinable) return interaction.reply('参加できないボイスチャンネルです。')
        const connection = joinVoiceChannel({
          guildId: interaction.guild.id,
          channelId: interaction.member.voice.channel.id,
          adapterCreator: interaction.guild.voiceAdapterCreator,
          selfMute: false,
        });
        await db.set(`${interaction.guild.id}_joined`, true).then(() => {
          const embed = new MessageEmbed().setTitle('TTS機能を有効にしました。').setDescription('このTTS読み上げにはvoiceTextのAPIを使用しています。\n 詳しくは公式HPを参考にしてください。\n[《VoiceText公式》](https://cloud.voicetext.jp/webapi)\n\n《注意事項》\n**・開発者はVoiceTextの利用規約に沿ってBOTを運用しています。**\n**・利用により金銭が発生することはありません。**\n**・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。**')
          interaction.reply({
            embeds: [embed]
          })
        })
      }
    })
  }interaction
  if (interaction.commandName === "off") {
        const memberVC = interaction.member.voice.channel;
        if (!memberVC) return interaction.reply('参加することが不可能です。')
        if (!memberVC.joinable) return interaction.reply('参加できないボイスチャンネルです。')
    db.delete(`${interaction.guild.id}_joined`).then(() => {
      const embed = new MessageEmbed().setTitle('TTS機能を無効にしました。').setDescription('このTTS読み上げにはvoiceTextのAPIを使用しています。\n 詳しくは公式HPを参考にしてください。\n[《VoiceText公式》](https://cloud.voicetext.jp/webapi)\n\n《注意事項》\n**・開発者はVoiceTextの利用規約に沿ってBOTを運用しています。**\n**・利用により金銭が発生することはありません。**\n**・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。**')
      interaction.reply({
        embeds: [embed]
      })
    })
  }
})
client.login(process.env.token)
