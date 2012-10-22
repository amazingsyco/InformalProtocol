var util = require("util");
var fs = require("fs");
var async = require("async");
var request = require("request");
var qs = require("querystring");
var prompt = require("prompt");

var config = require("./lib/config");
var twitter = require("./lib/twitter");
var appdotnet = require("./lib/appdotnet");

var FeedParser = require("feedparser");
var parser = new FeedParser();

function main(){
	parser.parseUrl("http://informalprotocol.com/atom.xml?d=" + (new Date().getTime()), {}, function(err, response, feed){
		var feedItem = feed[0];
		var title = feedItem.title;
		var url = feedItem.link.replace("informalprotocol.com//", "informalprotocol.com/");
		if(fs.existsSync("lasturl.txt") && fs.readFileSync("lasturl.txt") == url){
			console.log("No tweet/post necessary for " + url + ", bailing");
			process.exit();
		}

		var post = "" + title + " " + url;

		async.parallel([
			function postTweet(cb){
				twitter.tweet("informalproto", post, function(body){
					twitter.retweet("stevestreza", body.id_str, function(body){
						console.log("Tweeted and retweeted");
						cb(null);
					});				
				});
			},
			function postToADN(cb){
				appdotnet.post("informalprotocol", post, function(body){
					appdotnet.repost("stevestreza", body.id, function(body){
						console.log("Posted and reposted");
						cb(null);
					});
				});
			}
		], function(err, result){
			fs.writeFileSync("lasturl.txt", url);
			process.exit();
		});
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
	var params = {
		client_id: config.appdotnet.client_id,
		response_type: "token",
		redirect_uri: "http://informalprotocol.com/cb",
		scope: "write_post"
	};

	var url = "https://alpha.app.net/oauth/authenticate?" + qs.stringify(params);
	console.log("Request token URL: " + url);
}

if(process.argv[2] == "twitter-auth"){
	getTwitterToken();
}else if(process.argv[2] == "appdotnet-auth"){
	getADNToken();
}else if(process.argv[2] == "twitter-test-tweet"){
	twitter.tweet("informalproto", "@stevestreza Test", function(body){
		var tweetID = body.id_str;
		twitter.retweet("stevestreza", tweetID, function(body){
			console.log("Body: " + util.inspect(body));
		});
	});
}else if(process.argv[2] == "adn-test-post"){
	console.log("Appdotnet? " + util.inspect(appdotnet));
	appdotnet.post("informalprotocol", "@stevestreza Test", function(body){
		var postID = body.id;
		appdotnet.repost("stevestreza", postID, function(body){
			console.log("Body: " + util.inspect(body));
		});
	});
}else{
	main();
}
