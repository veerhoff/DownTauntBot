var config = require('./../config/config');
//var cooldown = require("./utils/cooldown");
var discord = require("discord.js");

let Discord = {};

//change to discord options
var options = {
	options : {
		debug: true
	},
	connection : {
		cluster: "aws",
		reconnect: true
	},
	identity : {
		username: config.twitch.username,
		password: config.twitch.password
	},
	channels: config.twitch.channels
};

Discord.connect = function() {
	Discord.client = new discord.Client();
	Discord.client.login(config.discord.login);
};

Discord.sendMessage = function(message) {

};

module.exports = Discord;
