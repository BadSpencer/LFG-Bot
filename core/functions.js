module.exports =  {

	getUser(client, userId){
		if(client.db.users.has(userId)){
			return client.db.users.get(userId);
		} else {
			let userData = client.functions.createUser(client, userId);
			return userData;
		}
	},
	setUser(client, userId, userData){
		if(client.db.users.has(userId)){
			return client.db.users.get(userId);
		} else {
			let userData = client.functions.createUser(client, userId);
			return userData;
		}
    },
    createUser(client, userID){
        let userData = Object.assign({}, client.datamodel.users);
        userData.id = userID;
        userData.createdAt = +new Date;
        client.db.users.set(userID, userData);
        return userData;
	},

	getMember(client, userId, guildId){
		let memberId = `${userId}${guildId}`;
		if(client.db.members.has(memberId)){
			return client.db.members.get(memberId);
		} else {
            return client.functions.createMember(client, userId, guildId);
		}
	},
	createMember(client, userId, guildId){
		let memberId = `${userId}${guildId}`;
		let memberData = Object.assign({}, client.datamodel.members);
		memberData.id = memberId;
		memberData.userId = userId;
		memberData.guildId = guildId;
        memberData.createdAt = +new Date;
		client.db.members.set(memberId, memberData);
		client.logger.log(`Membre`)
        return memberData;
	},

	getGuild(client, guildId){
		if(client.db.guilds.has(guildId)){
			return client.db.guilds.get(guildId);
		} else {
            return client.functions.createGuild(client, guildId);
		}
	},
	async createGuild(client, guildId){
		let guildData = Object.assign({}, client.datamodel.guilds);
		guildData.id = guildId;
        guildData.createdAt = +new Date;
        client.db.guilds.set(guildId, guildData);
        return guildData;
	},
	checkguild(member_id,guilds){
		owner_guilds = []
		bot_guilds = []
		invitebot_guilds = []
		guilds.forEach((item, i) => {
		  if(item.owner == true){
			owner_guilds.push({"name":item.name,"id":item.id})
			if(bot.guilds.cache.get(item.id)){
			  bot_guilds.push({"name":item.name,"id":item.id})
			}
			if(!bot.guilds.cache.get(item.id)){
			  invitebot_guilds.push({"name":item.name,"id":item.id})
			}
		  }
		});
		return {bot_guilds,invitebot_guilds}
	  },
	  manageguild(client, g_id){
		let guild = client.guilds.cache.get(g_id)
		if(guild){
		  let memberCount = guild.memberCount
		  let guildname = guild.name
		  let iconurl = guild.iconURL()
		  let owner = guild.owner.displayName
		  let id = guild.id
		  return {memberCount,guildname,iconurl,owner,id}
		}
		return "You dont share mutual guild with the bot"
	  },
	  async modifyguild(client, channels, g_id, webuser){
		let c = channels[0].split(',')
		editguild = client.guilds.cache.get(g_id)
		if(!editguild.channels.cache.find(c=>c.name == 'dashboard-logs')) return "Error"
		else{
		  let logs = await editguild.channels.cache.find(c => c.name == 'dashboard-logs')
		  logs.send(`User initiated edit guild ${webuser.tag}`)
		  c.forEach((item, i) => {
		  editguild.channels.create(item,"text").then(()=>{
			console.log("Channel created",item)
		  }).catch((e)=>{
			editguild.channels.cache.find(c => c.name == 'dashboard-logs').send(`[-] Error: ${e}`)
		  })
		  });
		}
		return "OK"
	}
}