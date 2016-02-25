var mongoose = require("mongoose"),
	News = mongoose.model("News"),
	request = require("request"),
	cheerio = require('cheerio'),
	iconv = require('iconv-lite'),
	fs = require("fs");

module.exports = {
	create: function(req, res, next){
		console.log('create a new news');
		var news = new News(req.body);

		news.save(function(err){
			if (err) {
				// statement
				return next(err);
			} else {
				return res.json(news);
			}
		});
	},
	list: function(req, res, next){
		console.log('servers start get news');
		
		var pagesize = parseInt(req.query.pagesize, 10);
		var pagestart = parseInt(req.query.pagestart, 10);

		News
		.find()
		.skip( (pagestart - 1) * pagesize )
		.limit( pagesize )
		.exec(function(err, docs){
			if(err) return next(err);

			return res.json(docs);
		});
	},
	getById: function(req, res, next, id){
		if(!id) return next(new Error("News not Found"));

		News
		.findOne({_id: id})
		.exec(function(err, doc){
			if(err) return next(err);

			if(!doc) return next(new Error("News not Found"));

			req.news = doc;
			return next();
		});
	},
	get: function(req, res, next){
		return res.json(req.news);
	},
	/**
	 * [getRemote description]
	 * @param  {[String]}(not need) channelId [频道id]
	 * @param  {[String]}(not need) channelName  [频道名字]
	 * @param  {[String]}(not need) title [新闻标题]
	 * @param {[number]}(not need) page [第几页新闻]
	 * 
	 * @return {[number]} allnum [全部新闻条数]
	 * @return {[number]} allpages [全部页数]
	 * @return {[json]} contentlist [内容列表]
	 */
	getRemote: function(req, res, next){
		console.log('getNews from other websites');
		request({
			url: "http://apis.baidu.com/showapi_open_bus/channel_news/search_news",
			qs: req.body,
			method: 'GET',
			headers: {
				apikey: "c709cdf09f4d85df958383c7555403f8",
			}
		},function(error, response, body){
			if(error) return next();

			var resbody = JSON.parse(body);
			if(resbody.showapi_res_body && resbody.showapi_res_body.pagebean){
				return res.json(JSON.stringify(resbody.showapi_res_body.pagebean));
			}
		});
	},
	/**
	 * [getNewsDetail description]
	 * @param  {[String]}   url  [要抓取的网页地址]
	 * 
	 * @return {[String]}  [返回html格式的内容]
	 */
	getNewsDetail: function(req, res, next){
		console.log('get news detail and translate it from remote');
		request({url: req.query.url, encoding: null}, function(error, response, body){
			if(error) return next();

			var reg = /charset="*(([a-z]|[A-Z]){2,3}-*[1-8]{0,4})"*/;
			var pageCharset = String(body).match(reg)[1];
			body = iconv.decode(body, pageCharset);

			//将抓取到的页面中某些没用的东西去除掉，去掉头部标题和script里面的东西确保不会出现一些多余的代码
			var $ = cheerio.load(body);

			var headerTag = ['.down_news','.header','.m-header'];

			for(var i = 0, len = headerTag.length; i<len; i++){
				if($(headerTag[i]).length){
					$(headerTag[i]).remove();
					break;
				}
			}

			$("script").each(function(index, elem){
				$(this).remove();
			});

			var resBody = $("body").html();

			return res.send(resBody);
		});
	}
};