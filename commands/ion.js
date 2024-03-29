exports.ion = async function(db,interaction,joinVoiceChannel,MessageEmbed,StreamType,createAudioResource,createAudioPlayer){
    const v = await db.get(`${interaction.guild.id}_joined`)
        if (v === true) return interaction.reply('すでに有効です。')
        else {
          const memberVC = interaction.member.voice.channel;
          if (!memberVC) return interaction.reply('参加することが不可能です。')
          if (!memberVC.joinable) return interaction.reply('参加できないボイスチャンネルです。')
        //==================================================================================//
        const connection = joinVoiceChannel({
          guildId: interaction.guild.id,
          channelId: interaction.member.voice.channel.id,
          adapterCreator: interaction.guild.voiceAdapterCreator,
          selfMute: false,
        });
        var min = 0 ;
        var max = 3 ;
        var select = Math.floor( Math.random() * (max + 1 - min) ) + min ;
        const resource = await createAudioResource(`./voice/tts_enable/tts_enable_${select}.wav`, { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();

        await player.play(resource);
        await connection.subscribe(player);

        //==================================================================================//
           await db.set(`${interaction.guild.id}_joined`, true)
          await db.set(`${interaction.guild.id}_messagechannel`,interaction.channel.id)
          const embed = new MessageEmbed().setTitle('TTS機能を有効にしました。').setDescription('このTTS読み上げにはvoiceTextのAPIを使用しています。\n 詳しくは公式HPを参考にしてください。\n[《VoiceText公式》](https://cloud.voicetext.jp/webapi)\n\n《注意事項》\n**・開発者はVoiceTextの利用規約に沿ってBOTを運用しています。**\n**・利用により金銭が発生することはありません。**\n**・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。**')
           await  interaction.reply({
              embeds: [embed]
            })
  }
}