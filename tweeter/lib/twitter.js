var config = require("./config");
var request = require("request");
var qs = require("querystring");

var performRequest = exports.performRequest = function(username, method, path, params, cb){
	var url = "https://api.twitter.com/1.1/" + path + ".json";
	var oauth = {
		consumer_key: config.twitter.consumer_key,
		consumer_secret: config.twitter.consumer_secret,
		token: config.twitter[username].access_token,
		token_secret: config.twitter[username].access_token_secret
	};
	url += "?" + qs.stringify(params);

	request[method]({url: url, oauth: oauth}, function(e, r, body){
		cb(JSON.parse(body));
	})
};

var tweet = exports.tweet = function(username, tweet, cb){
	performRequest(username, "post", "statuses/update", {status: tweet}, cb);
};

var retweet = exports.retweet = function(username, tweetID, cb){
	performRequest(username, "post", "statuses/retweet/" + tweetID, {}, cb);
}