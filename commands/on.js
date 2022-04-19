exports.on = async function(db,message,joinVoiceChannel,MessageEmbed){
    await db.get(`${message.guild.id}_joined`)
    if (v === true) return message.reply('すでに有効です。')
    else {
      const memberVC = message.member.voice.channel;

      if (!memberVC) return message.reply('参加することが不可能です。')
      if (!memberVC.joinable) return message.reply('参加できないボイスチャンネルです。')

      joinVoiceChannel({
        guildId: message.guild.id,
        channelId: message.member.voice.channel.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfMute: false,
      });

      await db.set(`${message.guild.id}_joined`, true)

      const embed = new MessageEmbed().setTitle('TTS機能を有効にしました。').setDescription('このTTS読み上げにはvoiceTextのAPIを使用しています。\n 詳しくは公式HPを参考にしてください。\n[《VoiceText公式》](https://cloud.voicetext.jp/webapi)\n\n《注意事項》\n**・開発者はVoiceTextの利用規約に沿ってBOTを運用しています。**\n**・利用により金銭が発生することはありません。**\n**・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。**')
      
      await message.reply('参加しました。')
      await message.reply({
          embeds: [embed]
        })
  }
}