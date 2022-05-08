exports.changesp = async (interaction,sp,MessageEmbed) => {
  switch(interaction.values[0]){
    case 'h_ha':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'haruka')
      interaction.reply('幸せなはるかに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'a_ha':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'haruka')
      interaction.reply('おこなはるかに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 's_ha':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'haruka')
      interaction.reply('かなしいはるかに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'sh':
      sp.set(`${interaction.member.id}_emo`,null)
      sp.set(`${interaction.member.id}_speak`,'show')
      interaction.reply('しょうに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'h_hi':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'hikari')
      interaction.reply('幸せなひかりに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 's_hi':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'hikari')
      interaction.reply('かなしいひかりに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'a_hi':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'hikari')
      interaction.reply('おこなひかりに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'h_ta':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'takeru')
      interaction.reply('幸せなたけるに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'a_ta':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'takeru')
      interaction.reply('おこなたけるに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 's_ta':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'takeru')
      interaction.reply('かなしいたけるに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'h_sa':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'santa')
      interaction.reply('幸せなさんたに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'a_sa':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'santa')
      interaction.reply('おこなさんたに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 's_sa':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'santa')
      interaction.reply('ぴえんなさんたに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'h_ku':
      sp.set(`${interaction.member.id}_emo`,'happiness')
      sp.set(`${interaction.member.id}_speak`,'bear')
      interaction.reply('しあわせなくまに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 'a_ku':
      sp.set(`${interaction.member.id}_emo`,'anger')
      sp.set(`${interaction.member.id}_speak`,'bear')
      interaction.reply('おこなくまに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
    case 's_ku':
      sp.set(`${interaction.member.id}_emo`,'sadness')
      sp.set(`${interaction.member.id}_speak`,'bear')
      interaction.reply('かなしいくまに設定しました。\n\n対象ユーザー : <@'+interaction.member.id+'>')
    break;
  }
}