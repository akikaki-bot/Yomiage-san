exports.off = function(db,message,MessageEmbed){
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