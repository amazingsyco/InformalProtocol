var util = require("util");
var async = require("async");
var request = require("request");
var qs = require("querystring");
var prompt = require("prompt");

var config = JSON.parse(require("fs").readFileSync("config.json"));

var FeedParser = require("feedparser");
var parser = new FeedParser();

function tweet(username, tweet, cb){
	var url = "https://api.twitter.com/1.1/statuses/update.json";
	var params = {
		status: tweet
	};
	var oauth = {
		consumer_key: config.twitter.consumer_key,
		consumer_secret: config.twitter.consumer_secret,
		token: config.twitter[username].access_token,
		token_secret: config.twitter[username].access_token_secret
	};

	url += "?" + qs.stringify(params);
	request.post({url: url, oauth: oauth}, function(e, r, body){
		var json = JSON.parse(body);
		cb(json);
	});
};

function main(){
	parser.parseUrl("http://informalprotocol.com/atom.xml", {}, function(err, response, feed){
		var feedItem = feed[0];
		var title = feedItem.title;
		var url = feedItem.link.replace("informalprotocol.com//", "informalprotocol.com/");
		var post = "\u1F4DD " + title + " " + url;

		async.parallel([
			function postTweet(cb){
				tweet("informalproto", post, function(body){
					
				});
			},
			function postToADN(cb){

			}
		], function(err, result){

		});
		console.log("\u1F4DD " + title + " " + url);
	});
}

function getTwitterToken(){
	var oauth = {
		callback: 'oob',
		consumer_key: config.twitter.consumer_key,
		consumer_secret: config.twitter.consumer_secret
	};
	var url = 'https://api.twitter.com/oauth/request_token';

	request.post({url:url, oauth:oauth}, function (e, r, body) {
		var requestToken = qs.parse(body);
		console.log("Request token:\n - Token: " + requestToken.oauth_token + "\n - Token secret: " + requestToken.oauth_token_secret + "\n - Authorize URL: https://api.twitter.com/oauth/authorize?oauth_token=" + requestToken.oauth_token);
		 prompt.get(['pin'], function(err, result){
		 	var pin = result.pin;
		 	console.log("PIN: " + pin);

		 	var oauth = {
		 		consumer_key: config.twitter.consumer_key, 
		 		consumer_secret: config.twitter.consumer_secret,
		 		token: requestToken.oauth_token,
		 		verifier: pin,
		 		token_secret: requestToken.oauth_token_secret
		    };
		    var url = 'https://api.twitter.com/oauth/access_token';
		    request.post({url:url, oauth:oauth}, function (e, r, body) {
			    var accessToken = qs.parse(body);
			    console.log("Access token: " + util.inspect(accessToken));
			});
		 });
	});
}

function getADNToken(){
	var url = "https://alpha.app.net/oauth/authenticate?client_id=" + config.appdotnet.client_id + "&response_type=token&redirect_uri=" + encodeURIComponent("http://localhost:8000/") + "&scope=write_post";
	console.log("Request token URL: " + url);
}

if(process.argv[2] == "twitter-auth"){
	getTwitterToken();
}else if(process.argv[2] == "appdotnet-auth"){
	getADNToken();
}else if(process.argv[2] == "twitter-test-tweet"){
	tweet("stevestreza", "@stevestrezadev \u1F4DD Test", function(){});
}else{
	main();
}
