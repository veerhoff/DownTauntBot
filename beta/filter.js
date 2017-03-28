var nsfw;

let filter = {};

filter.checkSub = function(command){
	var ret = {};
	command.unshift("nsfw");
	nsfw = true;
	ret.command = command;
	ret.nsfw = nsfw;
	return ret;
}

filter.sfwFilter = function(command){
	var ret = {};
	var time = new Date();
	var day = time.getDay();
	var hr = time.getHours();
	var min = time.getMinutes();
	if (hr > 7 && hr < 16 && nsfw && (day !== 0 || day !== 6) && sfw_channel.indexOf(msg.channel.id) !== -1) {
		command[0] = "safe";
		console.log("(" + hr + ":" + min + ") " + msg.author.username + " tripped safe hours - " + msg + " in #" + msg.channel.name);
	}
	ret.command = command;
	return ret;
}

module.exports = filter;