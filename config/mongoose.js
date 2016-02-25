/**
 * [mongoose]
 * @description mongoose连接
 * @author xiaoming
 * @date 2016/01/28
 */
var mongoose = require('mongoose');
var config = require("./config");

module.exports = function(){
	var db = mongoose.connect(config.mongodb);

	var conn = mongoose.connection;
	conn.on('error', function(){
		console.error('connection error:');
	});
	conn.once("open", function(){
		console.info("connect to mongodb");
	});

	require('../app/models/news.server.models');

	return db;
};