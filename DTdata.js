var discord = require('discord.js');
var snoowrap = require('snoowrap');
var config = require('./config/config.js');

let data = {};

data.discord = new discord.Client();

data.snoo = new snoowrap({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',	
  clientId: config.reddit.clientID,
  clientSecret: config.reddit.clientSecret,	//THIS SHOULD NEVER KNOWN TO ANYONE BUT YOU (redact when sending code to others)
  refresh_token: config.reddit.refreshToken,		
});

//key-value pairs for stream links
data.stream_links = {
	"83785035622121472" : "https://www.twitch.tv/ikewolf",
	"163785229784449024" : "https://www.twitch.tv/hoooooftv",
	"152946490623524865" : "https://www.twitch.tv/jrawly",
	"130755715227713537" : "https://www.twitch.tv/jinglestown",
	"181154262024323073" : "https://www.twitch.tv/davyleee",
	"231793417342943232" : "https://www.twitch.tv/daniiel_rl"
}

//key-value pairs for access log channels
data.access_channels = {
	"Hoofcord": "242393356351569921",
	"Down Taunt": "281881451090149378",
	"The Purp Slurp": "234385676139888640"
}

data.welcome_channels = {

	
}

//array of funny stuff for the !tilt command
data.goofs = [
	"https://www.youtube.com/watch?v=Jr9DM3St0vA",
	"http://plays.tv/video/57cca977e1abd6c298/davy-lee-3?from=user",
	"https://clips.twitch.tv/mockitleague/HappyChamoisBuddhaBar",
	"https://i.imgur.com/7lPeeez.jpg"
];

//array of channel IDs in which various nsfw commands WILL WORK
data.nsfw_channel = [
	"231762738215387136", 	//Hoofcord test
	"232520268516556810", 	//Hoofcord sqawd
	"231536410031685632",  	//DT VIP
	"281881451090149378",	//DT test
	"234385676139888640"	//Purp Slurp Test
];

data.sfw_channel = [
	"195688000284393474", 	//Purp Slurp General
	"234385676139888640"	//Purp Slurp Test
];

data.betaUsers =  [
	"Jrawly",
	"Galaxy",
	"KoNz",
	"Hooooof",
	"ErītoBeef"
];

data.modUsers = [
	"83976272841015296", //shawnee
	"163785229784449024", //hoof
	"197414267702607873", //lucackerman
	"104671414707064832", //jakey
	"168423293479550976" //galaxy
];

data.nsfw_subs = ["boobs","ass","penis","dicks","rule34","bbw"];
data.sfw_subs = ["rocketleague","aww"];

data.DT_channel = "218634701047332866"; //DT General
data.beta_channel = "240789121109327873";

module.exports.data = data;