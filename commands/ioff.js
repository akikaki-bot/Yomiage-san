exports.ioff = async (joinVoiceChannel,db,interaction,MessageEmbed) => {
  try{
    const connection = joinVoiceChannel({
            guildId: interaction.guild.id,
            channelId: interaction.member.voice.channel.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfMute: false,
          });
    const memberVC = interaction.member.voice.channel;
        if (!memberVC) return interaction.reply('参加することが不可能です。')
        if (!memberVC.joinable) return interaction.reply('参加できないボイスチャンネルです。')
    await connection.destroy()
    await db.delete(`${interaction.guild.id}_joined`)
    const embed = new MessageEmbed().setTitle('TTS機能を無効にしました。').setDescription('このTTS読み上げにはvoiceTextのAPIを使用しています。\n 詳しくは公式HPを参考にしてください。\n[《VoiceText公式》](https://cloud.voicetext.jp/webapi)\n\n《注意事項》\n**・開発者はVoiceTextの利用規約に沿ってBOTを運用しています。**\n**・利用により金銭が発生することはありません。**\n**・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。**')
    await interaction.reply({
        embeds: [embed]
      })
  }catch(error){
    console.error(error.message)
  }
}