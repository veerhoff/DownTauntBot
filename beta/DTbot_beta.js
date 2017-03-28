			/*
	    	case "addcom":
	    		var key = command[1];
	    		var value = command.slice(2,command.length).join(" ");
	    		writer.readDictionary(function(dictionary){
					writer.addPair(dictionary, key, value, function(){
						writer.writeDictionary(dictionary, function(){
							msg.channel.sendMessage("command written: \"!" + key + "\"");
						});
					});
				});
				temp_customs[key] = value;
			break;

			case "delcom":
				var key = command[1];
	    		writer.readDictionary(function(dictionary){
					writer.deletePair(dictionary, key, function(){
						writer.writeDictionary(dictionary, function(){
							msg.channel.sendMessage("command deleted: \"!" + key + "\"");
						});
					});
				});
				delete temp_customs[key];
			break;		
			*/		

			/*giflibrary BETA
			case "gif":
				command.splice(0, 1);
				if (beta.indexOf(msg.author.username) !== -1 && msg.channel.id === beta_channel){
					
					switch(command[0]){
						case "help":
							msg.channel.sendMessage("Welcome to the DT GIF Library! There are two commands:\n\n `!gif add link` will add `link` to the library (`link` must be in the form <https://gfycat.com/YourGifUrl>)\n `!gif view user` will DM you a list of a user's GIFs (use `me` to view your own GIFs!)");
							break;
						case "setup":
							if (msg.author.username === "Hooooof"){
								helper.setup(function(){
									msg.channel.sendMessage("Table created");
								});
							}
							else {
								msg.channel.sendMessage("need admin access");
							}
							break;
						case "add":
							if (command[1].startsWith("https://gfycat.com/")){
								helper.addGif(msg.author.username, command[1], function(){
									msg.channel.sendMessage("Your GIF has been added!");
								});
							}
							else {
								msg.channel.sendMessage("GIF link must start with <https://gfycat.com/>");
							}
						break;
						case "view":
							if (command[1] === "me"){
								command[1] = msg.author.username;
							}
							helper.viewUser(command[1], function(gif_array){
								msg.author.sendMessage("Here are the GIFs for " + command[1] + ":");
								for (var i=0; i<gif_array.length; i++){
									gif_array[i] = gif_array[i].replace(/"/g,"");
									msg.author.sendMessage(gif_array[i]);
								}
								msg.channel.sendMessage("Check DMs for output");
							});
						break;
					}
				}
			break;
			*/
/*
bot.on("voiceStateUpdate", (oldmem, newmem) => {

	var time = new Date();	
	var hr = time.getHours();
	var min = time.getMinutes();
	if (min<10) min = "0"+min.toString();
	
	if (oldmem.user.bot) return; //ignores bot movement
	if (oldmem.mute!==newmem.mute) return;
	if (oldmem.guild.name === "Down Taunt" || newmem.guild.name === "Down Taunt") return;

	if (newmem.user.username === "Hooooof"){
		if (!newmem.voiceChannel){
			oldmem.voiceChannel.leave();
			return;
		}
		newmem.voiceChannel.join()
			.then(connection => {
				console.log("sniped " + newmem.user.username + " in " + newmem.voiceChannel.name + "(" + newmem.guild.name + ")");
				const dispatcher = connection.playFile('./audio/fanfare.mp3')
			}).catch(console.error);
	}

	if (newmem.guild.name === "The Purp Slurp"){
		if (!newmem.voiceChannel){
			oldmem.voiceChannel.leave();
			return;
		}
		var file;
		switch (newmem.user.id){
			case "195983397636538368": //matt
				file = './audio/work.mp3';
			break;
			case "195670108855730176": //curtis
				file = './audio/fanfare.mp3';
			break;
			case "196325929037856769": //kyle
				file = './audio/circus.mp3';
			break;
			case "195690361950044161": //nic
				file = './audio/seagulls.mp3';
			break;
			case "163785229784449024": //hoof
				file = './audio/troll.mp3';
			break;
			case "196092701798563840": //robertson
				file = './audio/scatman.mp3';
			break;
			case "168797231334424577": //david
				file = './audio/scatman.mp3';
			break;
			case "196318726054739968": //jroll
				file = './audio/pink.mp3';
			break;
		}
		if (file!==undefined){
			newmem.voiceChannel.join()
				.then(connection => {
					console.log("(" + hr + ":" + min + ") sniped " + newmem.user.username + " in " + newmem.voiceChannel.name + "(" + newmem.guild.name + ") - playing " + file);
					const dispatcher = connection.playFile(file);
				}).catch(console.error);
			//newmem.user.dmChannel.sendMessage("type `!stop` and i'll fuck right off!");
		}
	}
});
var target = ""; //"83985344902463488" mighty
bot.on("typingStart",(channel, user) => {

	if (user.id===target){
		var mem = channel.guild.members.find(mem => mem.user.id === target);
		var vc = mem.voiceChannel;
		if (vc!==undefined&&vc!==null){
			vc.join()
				.then(connection => {
					console.log("caught " + user.username + " typing in #" + channel.name + " on " + channel.guild.name + "; ./audio/troll.mp3 dispatched");
					const dispatcher = connection.playFile('./audio/troll.mp3');
			}).catch(console.error);
		}
		channel.sendMessage("DONT EVEN JUST STFU " + user.username.toUpperCase());
	}
});
bot.on("typingStop",(channel, user) => {

	if (user.id===target){
		var mem = channel.guild.members.find(mem => mem.user.id === target);
		var vc = mem.voiceChannel;
		if (vc!==undefined&&vc!==null){
			vc.leave();
		}
		channel.sendMessage("that's what I thought");
	}
});
*/