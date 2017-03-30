var config = require('./config/config.js'); 
var db = require('./DTdata.js');

var bot = db.data.discord; //client
const r = db.data.snoo; //reddit wrapper
var goofs = db.data.goofs; //array of funny stuff for the !tilt command

var nsfw_channel = db.data.nsfw_channel;
var sfw_channel = db.data.sfw_channel;
var access_channels = db.data.access_channels;
var DT_channel = db.data.DT_channel;
var beta_channel = db.data.beta_channel;

var beta = db.data.betaUsers;
var mods = db.data.modUsers;
var stream_links = db.data.stream_links;
var nsfw_subs = db.data.nsfw_subs;
var sfw_subs = db.data.sfw_subs;

var nsfw = false;

//This is the part of the script that handles user input in discord text channels that the bot lives in
bot.on("message", msg => {


	//establish bot prefix - this variable determines the character that triggers the bot's commands
	let prefix = "!";

	//KYLE-----------------------------------------------------------------
	var kyleid = ""; //"163785229784449024"
	if (msg.author.id === kyleid){
		msg.channel.sendFile('./img/kyle.png');
	}
	//KYLE-----------------------------------------------------------------

    if (msg.author.bot) return;
	if (!msg.content.startsWith(prefix)) return;

	var msg_str = msg.toString();
	var command = msg_str.slice(1,msg_str.length).split(" ");
	command = command.filter(function(word){
		return word;
	});

	if (nsfw_subs.indexOf(command[0]) !== -1){
		command.unshift("nsfw");
		nsfw = true;
	}
	var time = new Date();
	var day = time.getDay();
	var hr = time.getHours();
	var min = time.getMinutes();
	if (min<10) min = "0"+min.toString();
	if (hr > 7 && hr < 16 && nsfw && (day !== 0 || day !== 6) && sfw_channel.indexOf(msg.channel.id) !== -1) {
		command[0] = "safe";
		console.log("(" + hr + ":" + min + ")" + msg.author.username + " tripped safe hours - " + msg + " in #" + msg.channel.name);
	}

	if (msg.channel.type === "dm" && mods.indexOf(msg.author.id) !== -1){
		if (command[0]==="echo"){
			if (command[1]==="DT"){
				var echochannel = bot.channels.find(channel => channel.id = "218634701047332866")
				command.splice(0,2);
				var echo = command.join(" ");
				console.log("(" + hr + ":" + min + ")" + msg.author.username + ":" + echo)
				echochannel.sendMessage(echo);
			}
		}
	}

    switch (command[0]) {

    	case "godmode":
    		if (msg.author.username === "Hooooof"){
    			if (command[1]==="on"){
	    			var role = msg.member.guild.roles.find(role => role.name === "Owner");
	    			msg.member.addRole(role);    
    			}
    			else if (command[1] === "off"){
	    			var role = msg.member.guild.roles.find(role => role.name === "Owner");
	    			msg.member.removeRole(role);    				
    			}
    		}
    	break;
    	case "assign":
    		if (command[1]!==undefined){
    			var region = command[1];
    			//var user_id = command[2];
    			var mem = msg.member;
    			var mem_roles = mem.roles.map(role => role.name);
    			if (mem_roles.indexOf("[NA]")===-1&&mem_roles.indexOf("[EU]")===-1){
    				if (command[1] === "na"){
    					msg.member.addRole(msg.member.guild.roles.find(role => role.name === "[NA]"));
    				}
    				else if (command[1] === "eu"){
    					msg.member.addRole(msg.member.guild.roles.find(role => role.name === "[EU]"));
    				}
    			}
    		}
    	break;
    	case "remove":
    		if (command[1]!==undefined){
    			var region = command[1];
    			//var user_id = command[2];
    			var mem = msg.member;
    			var mem_roles = mem.roles.map(role => role.name);
				if (command[1] === "na"){
					msg.member.removeRole(msg.member.guild.roles.find(role => role.name === "[NA]"));
				}
				else if (command[1] === "eu"){
					msg.member.removeRole(msg.member.guild.roles.find(role => role.name === "[EU]"));
				}
    		}
    	break;

		//Uses stream_links key-val pairs to grab correct link
		case "stream":
			var stream_link = stream_links[msg.author.id];
			if (stream_link){
				msg.channel.sendMessage("<@" + msg.author.id + "> is now streaming @ " + stream_link);
			}
			if (msg.author.username === "Ikewolf"){
				msg.channel.sendMessage("PogChamp?");
			}
		break;

		//SFW reddit			
		case "rlgif":
			r.getSubreddit("rocketleague").getTop({time: 'week', limit: 50}).then(myListing => {
				var filt = myListing.filter(function(entry){
					return entry.link_flair_text == "GIF";
				});
				var rand = Math.floor(Math.random()*filt.length);
				msg.channel.sendMessage(filt[rand].url);
			});
	    break;

	    case "aww":
	    	r.getSubreddit("aww").getTop({time: 'week', limit: 50}).then(myListing => {
				var link = myListing[Math.floor(Math.random()*50)].url;
				console.log(link);
				if (link.includes("gfycat")||link.endsWith(".jpg")||link.endsWith(".png")||link.endsWith(".gif")||link.endsWith(".gifv")) {
					msg.channel.sendMessage(link);
				}
				else {
					link += ".jpg";
					msg.channel.sendMessage(link);
				}
			});
	    break;

	    //goofs
	    case "ban":
	    	command.splice(0, 1);
			var banned = command.join(" ");
	    	if (/[h][o]+[f]/gi.test(banned) || /[a][l][e][x]/gi.test(banned) || banned === "@Hooooof#8588"){
	    		msg.channel.sendMessage(msg.author.username.toUpperCase() + " has been banned");
	    	}
	    	else {
	    		msg.channel.sendMessage(banned.toUpperCase() + " has been banned");
	    	}
	    	break;
	   	case "jesus":
	    	msg.channel.sendMessage("https://upload.wikimedia.org/wikipedia/en/9/93/Buddy_christ.jpg");
	    break;

	    case "reddit":
	    	if (command[1] === "dicks") {command[1] = "penis"};
			if (parseInt(command[2])) {command[2] = parseInt(command[2])};
	    	if (nsfw_channel.indexOf(msg.channel.id) !== -1){  	
	    		if (command[2] > 5) command[2] = 5;
	    		else if (command[2] <= 0 || !command[2] || typeof command[2] !== "number"){
	    			command[2] = 1;
	    		}
	    		for (var i=0; i<command[2]; i++){
			    	r.getSubreddit(command[1]).getTop({time: 'week', limit: 10*command[2]}).then(myListing => {
						var link = myListing[Math.floor(Math.random()*10*command[2])].url;
							/*
							console.log(link);
							if (link.includes("gfycat")||link.endsWith(".jpg")||link.endsWith(".png")||link.endsWith(".gif")||link.endsWith(".gifv")) {
								msg.channel.sendMessage(link);
							}
							else {
								link += ".jpg";
								msg.channel.sendMessage(link);
							}
							*/
						msg.channel.sendMessage(link);
		    		});
				}
			}
		break;

		case "safe":
			msg.channel.sendMessage("SFW hours currently active. Administrator will notify your employer/parents. Shame on you.");
		break;

		//test and help
    	case "test":
    		if (msg.author.username === "Hooooof"){
    			msg.channel.sendMessage("testing");
    		}
    	break;
    	case "untest":
    		msg.channel.sendMessage("untesting");
    	break;

    	case "help":
	    	msg.channel.sendMessage("Hello there! My name is Artificial Intelligence for the DownTaunt Server! \n\nUniversal commands: `" + prefix + "rlgif`,`" + prefix + "aww`,`" + prefix + "noob`,`" + prefix + "tilt` \n\nIf you'd like to add your twitch/youtube link to the `" + prefix + "stream` command, contact <@163785229784449024>");
	    break;

	    case "play":
	    	if (command[1]!==undefined && msg.member.voiceChannel && mods.indexOf(msg.member.id)){
	    		var file;
	    		switch (command[1]){
	    			case "sarge":
	    				file = './audio/seargent.mp3';
	    			break;
	    			case "fanfare":
	    				file = './audio/fanfare.mp3';
	    			break;
	    			case "circus":
	    				file = './audio/circus.mp3';
	    			break;
	    			case "seagulls":
	    				file = './audio/seagulls.mp3';
	    			break;
	    			case "troll":
	    				file = './audio/troll.mp3'
	    			break;
	    			case "scat":
						file = './audio/scatman.mp3';
					break;
					case "pink":
						file = './audio/pink.mp3';
					break;
					case "work":
						file = './audio/work.mp3';
					break;
	    		}
	    		msg.member.voiceChannel.join()
					.then(connection => {
						if (typeof file==="string"){
							const dispatcher = connection.playFile(file);
						}
						
					}).catch(console.error);
	    	} 
	    break;

	    case "stop":
	    	if(bot.voiceConnections.array().length > 0){
	    		bot.voiceConnections.array()[0].disconnect();
	    	}
	    break;
	    
	}
});


bot.on("voiceStateUpdate", (oldmem, newmem) => {

	var time = new Date();	
	var hr = time.getHours();
	var min = time.getMinutes();
	if (min<10) min = "0"+min.toString();
	
	if (oldmem.user.bot) return; //ignores bot movement
	if (oldmem.mute!==newmem.mute) return;
	if (oldmem.guild.name === "Down Taunt" || newmem.guild.name === "Down Taunt") return;

	if (newmem.user.username === "Hooooof"){
		if (oldmem.voiceChannel) oldmem.voiceChannel.leave();
		if (!newmem.voiceChannel) return;
		newmem.voiceChannel.join()
			.then(connection => {
				console.log("sniped " + newmem.user.username + " in " + newmem.voiceChannel.name + "(" + newmem.guild.name + ")");
				const dispatcher = connection.playFile('./audio/fanfare.mp3')
			}).catch(console.error);
	}

	/*
	if (newmem.guild.name === "Hoofcord"){
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
	*/
});

var target; //galaxy
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

bot.on("guildMemberAdd", (member) => {
    console.log(`"${member.user.username}" has joined "${member.guild.name}"`);
    member.guild.channels.get(access_channels[member.guild.name]).sendMessage(`"${member.user.username}" has joined this server`);
    member.guild.defaultChannel.sendMessage("Welcome to the Down Taunt server <@" + member.user.id + ">! To assign your region, type `!assign na` or `!assign eu` into the general chat. Go to <@218820100021551105> for more information!")
});

bot.on("guildMemberRemove", (member) => {
    console.log(`"${member.user.username}" has left "${member.guild.name}"`);
    member.guild.channels.get(access_channels[member.guild.name]).sendMessage(`"${member.user.username}" has left this server`);
});

bot.on('ready', () => {
  console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.login(config.discord.login);