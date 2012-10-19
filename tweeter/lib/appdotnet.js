var config = require("./config");
var request = require("request");
var qs = require("querystring");

var performRequest = exports.performRequest = function(username, method, path, params, cb){
	var url = "https://alpha-api.app.net/stream/0/" + path;

	request[method]({url: url, body: qs.stringify(params), headers: {"Authorization": "Bearer " + config.appdotnet[username].access_token}}, function(e, r, body){
		var json = JSON.parse(body);
		cb(json);
	});
};

var post = exports.post = function(username, post, cb){
	performRequest(username, "post", "posts", {text: post}, cb);
}

var repost = exports.repost = function(username, postID, cb){
	performRequest(username, "post", "posts/" + postID + "/repost", {}, cb);
}