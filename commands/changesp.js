exports.changesp = async (interaction,sp,MessageEmbed) => {
  switch(interaction.values[0]){
    case 'h_ha':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'haruka')
      interaction.reply({content:'幸せなはるかに設定しました。',ephemeral: true })
    break;
    case 'a_ha':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'haruka')
      interaction.reply({content:'おこなはるかに設定しました。',ephemeral: true })
    break;
    case 's_ha':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'haruka')
      interaction.reply({content:'かなしいはるかに設定しました。',ephemeral: true })
    break;
    case 'sh':
      sp.set(`${interaction.member.id}_emo`,null)
      sp.set(`${interaction.member.id}_speak`,'show')
      interaction.reply({content:'しょうに設定しました。',ephemeral: true })
   break;
    case 'h_hi':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'hikari')
      interaction.reply({content:'幸せなひかりに設定しました。',ephemeral: true })
    break;
    case 's_hi':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'hikari')
      interaction.reply({content:'かなしいひかりに設定しました。',ephemeral: true })
    break;
    case 'a_hi':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'hikari')
      interaction.reply({content:'おこなひかりに設定しました。',ephemeral: true })
    break;
    case 'h_ta':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'takeru')
      interaction.reply({content:'幸せなたけるに設定しました。',ephemeral: true })
    break;
    case 'a_ta':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'takeru')
      interaction.reply({content:'おこなたけるに設定しました。',ephemeral: true })
    break;
    case 's_ta':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'takeru')
      interaction.reply({content:'かなしいたけるに設定しました。',ephemeral: true })
    break;
    case 'h_sa':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'santa')
      interaction.reply({content:'幸せなさんたに設定しました。',ephemeral: true })
    break;
    case 'a_sa':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'santa')
      interaction.reply({content:'おこなさんたに設定しました。',ephemeral: true })
    break;
    case 's_sa':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'santa')
      interaction.reply({content:'ぴえんなさんたに設定しました。',ephemeral: true })
    break;
    case 'h_ku':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'bear')
      interaction.reply({content:'しあわせなくまに設定しました。',ephemeral: true })
    break;
    case 'a_ku':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'bear')
      interaction.reply({content:'おこなくまに設定しました。',ephemeral: true })
    break;
    case 's_ku':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'bear')
      interaction.reply({content:'かなしいくまに設定しました。',ephemeral: true })
    break;
  }
}