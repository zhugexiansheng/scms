/*
 * 服务器实例
 * 注意：use中间件之间也是顺序执行的，所以需要把webpack的配置放在前面，生成相应的静态文件到
 * 		内存中才能在use(static)静态文件中使用，然后把错误处理放在最后面来处理输出，不然会拿不到
 * 		webpack在测试环境中，处理之后放在缓存中的文件
 */
'use strict';

var express = require("express"),
	bodyParser = require('body-parser'),
	path = require("path"),
	config = require("./config");

module.exports = function(){
	console.log("init express");

	var app = express();

	//使用bodyParser对post请求进行处理，将请求的参数处理成json格式
	app.use(bodyParser.json());

	//加入webpack-middleware
	if(config.isDev){
		console.log('developent Dev run');
		var webpackDevMiddle = require("webpack-dev-middleware");
		var webpackHotMiddle = require("webpack-hot-middleware");
		var webpack = require("webpack");
		var compiler = webpack(config.webpackConf);

		app.use(webpackDevMiddle(compiler, {
			path: config.webpackConf.output.path,
	        hot: true,
	        inline: true,
	        // stats: webpackDevConf.devServer.stats
	        stats: {
	            cached: false,
	            colors: true
	        }
		}));

		app.use(webpackHotMiddle(compiler, {
		    log: console.log
		}));
	}else{
		console.log('production Dev run');
	}

	app.use(express.static("./public"));

	require("../app/routes/news.server.routes.js")(app);

	//错误处理，如果找不到文件或者地址
	app.use(function(req, res, next){
		res.status(404);

		//保证不会进行多次返回
		try {
			return res.json('Not Found');
		} catch(e) {
			// statements
			console.log('404 set header after send');
		}
	});

	//如果程序报错了，返回500
	app.use(function(err, req, res, next){
		if (!err) {
			return next();
		} else {
			res.status(500);

			try {
				// statements
				return res.json(err.message || 'server error');
			} catch(e) {
				// statements
				console.log('500 set header after send');
			}
		}
	});

	return app;
}