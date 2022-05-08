exports.speakch = async (interaction,MessageEmbed,sp,MessageActionRow,MessageSelectMenu) => {
  if(!interaction.guild) return interaction.reply('This command has guilds only.')
  const embed = new MessageEmbed().setTitle('話し手変更☆').setDescription('下のメニューから選んで下さい。')
  const row = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('chsp').setPlaceholder('話す人選択').addOptions([
  {label:'幸せなはるか',value: "h_ha"},
  {label:'おこなはるか',value:"a_ha"},
  {label:"かなしいはるか",value:'s_ha'},
  {label:"しょう",value:'sh'},
  {label:'幸せなひかり',value: "h_hi"},
  {label:'おこなひかり',value: "a_hi"},
  {label:'かなしいひかり',value: "s_hi"},
  {label:'幸せなたける',value: "h_ta"},
  {label:'おこなたける',value: "a_ta"},
  {label:'かなしいたける',value: "s_ta"},
  {label:'幸せなさんた',value: "h_sa"},
  {label:'おこなさんた',value: "a_sa"},
  {label:'かなしいさんた',value: "s_sa"},
  {label:'幸せなくま',value: "h_ku"},
  {label:'おこなくま',value: "a_ku"},
  {label:'かなしいくま',value: "s_ku"},
  ]),);
  interaction.reply({
    embeds:[embed],
    components: [row]
  })
}