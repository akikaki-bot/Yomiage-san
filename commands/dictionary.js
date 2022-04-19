



exports.dictionary = async (interaction,dic) => {
  let dic_word = interaction.options.get('word').value
  let dic_speak = interaction.options.get('読み上げ方').value
//=====================================================================
  
  const dic_db = await dic.get(`${interaction.guild.id}_words`)
  
  let reg
  let save_dic

  if(dic_db){
    let dic_reg = dic_db.join(',')
    reg = `${dic_reg},${dic_word}`
  }
  else reg = `${dic_word}`
  save_dic = reg.split(',');
  await dic.set(`${interaction.guild.id}_words`,save_dic)
  
//=====================================================================
  
  const dic_db_s = await dic.get(`${interaction.guild.id}_speak`)

  let reg_s
  let save_dic_s
  
  if(dic_db_s){
    let dic_reg_s = dic_db_s.join(',')
    reg_s = `${dic_reg_s},${dic_speak}`
  }
  else reg_s = `${dic_speak}`
  save_dic_s = reg_s.split(',');
  await dic.set(`${interaction.guild.id}_speak`,save_dic_s)

//=====================================================================
  
  await interaction.reply(`単語をセーブしました。\n\n${dic_word} \n読み方 : ${dic_speak}`)
}