exports.main = function(db,message,voiceText,createAudioPlayer,createAudioResource,AudioPlayerStatus,writeFileSync,getVoiceConnection,StreamType,joinVoiceChannel){
 db.get(`${message.guild.id}_joined`).then(async v => {
    if (!v) return
    else {
      console.log('[botlog]  voiceTextのBufferをしています。 対象メッセージ : ' + message.content)
      let txt = ""
      if (message.content.length > 45) {
        txt = "ながすぎるよ！"
      } else {
        txt = message.content
      }
      if (message.content.match(/!join|!leave|!off/)) return;
      voiceText.fetchBuffer(txt, {
        format: 'wav'
      }).then(async(buffer) => {
        console.log('[botlog]  Bufferが完了しました。 対象メッセージ : ' + message.content)
        writeFileSync('voice.wav', buffer)
        //呼び出し----------------------------
        const connection = joinVoiceChannel({
          guildId: message.guild.id,
          channelId: message.member.voice.channel.id,
          adapterCreator: message.guild.voiceAdapterCreator,
          selfMute: false,
        });
        const resource = createAudioResource("./voice.wav", { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => console.log('[botlog] メッセージを待機中'));

        player.on(AudioPlayerStatus.Playing, () => {
          console.log('[botlog] 再生中');
        });
        player.on('error', error => {
          console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
          message.react('😢')
        });
     })
    }
  })
}
