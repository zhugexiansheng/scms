var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

function getPageByUrl(url){
	request({url: url}, function(err, res, body){
		if(err) return console.log(err);

		var $ = cheerio.load(body), urlList = [];
		$("a").each(function(){
			var $me = $(this);
			var href = $me.attr("href");

			urlList.push(href);
		});

		console.log(urlList);
	});
}

module.exports = getPageByUrl;